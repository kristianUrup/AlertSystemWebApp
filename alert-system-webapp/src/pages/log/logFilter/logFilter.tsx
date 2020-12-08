import React, { useEffect, useState } from "react";
import { AlarmLog, AlarmLogType } from "../../../models/AlarmLog";
import "./logFilter.css"

interface LogFilterProps {
    alarmLogs: AlarmLog[];
    setAlarmLogs(data: AlarmLog[]): void; 
}

const LogFilter: React.FC<LogFilterProps> = ({ alarmLogs, setAlarmLogs }) => {

    const [filterDate, setFilterDate] = useState<Date>();
    const [filterHour, setFilterHour] = useState(0);
    const [filterTime, setFilterTime] = useState(0);
    const [filterStatus, setFilterStatus] = useState<AlarmLogType>(AlarmLogType.SENT);
    const [filter, setFilter] = useState(false);
    const [useFilterHour, setUseFilterHour] = useState(false);
    const [useFilterStatus, setUseFilterStatus] = useState(false);

    const filterAlarmLogs = () => {
        let filteredList = alarmLogs;

        if (filterDate) {
            filteredList = filteredList.filter(data => checkIfDateIsEqual(data.date));

            if (useFilterHour) {
                filteredList = filteredList.filter(data => checkIfDateIsInTimeFrame(data.date));
            }
        }

        if (useFilterStatus) {
            filteredList = filteredList.filter(data => data.lastStatus === filterStatus);
        }

        setAlarmLogs(filteredList);
    }

    const checkIfDateIsEqual = (date: Date) => {
        return date.getDate() === filterDate?.getDate() && 
            date.getMonth() === filterDate.getMonth() && 
            date.getFullYear() === filterDate.getFullYear();
    }

    const checkIfDateIsInTimeFrame = (date: Date) => {
        if (filterDate) {
            const timeFrame = filterDate;
            timeFrame.setHours(filterHour);

            const dateTime = date.getTime();
            const timeFrameTime = timeFrame.getTime();


            return dateTime >= timeFrameTime && dateTime <= timeFrameTime + filterTime; 
        }
        return true;
    }

    const createHourOptions = () => {
        const numbers: number[] = [];
        for (let i = 0; i < 24; i++) {
            numbers.push(i);
        }
        return numbers;
    }

    const getDateInputFormat = () => {
        if (filterDate) {
            const month = filterDate.getMonth() + 1 < 10 ? `0${filterDate.getMonth() + 1}` : `${filterDate.getMonth() + 1}`
            const date = filterDate.getDate() < 10 ? `0${filterDate.getDate()}` : `${filterDate.getDate()}`
            return `${filterDate.getFullYear()}-${month}-${date}`;
        } else {
            return "";
        }
    }

    const setLastStatusFilter = (value: string) => {
        switch (value) {
            case "Dips":
                setFilterStatus(AlarmLogType.DIPS);
                break;
            case "Fixed":
                setFilterStatus(AlarmLogType.FIXED);
                break;
            case "Escalate":
                setFilterStatus(AlarmLogType.ESCALATE);
                break;
            case "Sent":
                setFilterStatus(AlarmLogType.SENT);
                break;
            case "Snooze":
                setFilterStatus(AlarmLogType.SNOOZE);
                break;
        }
    }

    const resetInputs = () => {
        setFilterDate(undefined);
        setFilterHour(0);
        setFilterTime(0);
        setFilterStatus(AlarmLogType.SENT);
        setUseFilterHour(false);
        setUseFilterStatus(false);
    }

    const resetSpecificInputs = () => {
        if (!useFilterHour) {
            setFilterHour(0);
            setFilterTime(0);
        }
        if (!useFilterStatus) {
            setFilterStatus(AlarmLogType.SENT);
        }
    }

    useEffect(() => {
        if (filter) {
            filterAlarmLogs();
        } else {
            setAlarmLogs(alarmLogs);
            resetInputs();
        }
    }, [filterDate, filter, filterHour, filterTime, useFilterHour, useFilterStatus, filterStatus])

    useEffect(() => {
        if (filter) {
            resetSpecificInputs()
        }
    }, [useFilterHour, useFilterStatus])
    
    return (
        <div className="log-filter__container">
            <div className="log-filter__settings">
                <div>
                    Filter settings
                </div>
                <button onClick={() => setFilter(!filter)} style={{ backgroundColor: filter ? "#2bcf57" : "#ff3e30" }}>
                    {filter ? "ON" : "OFF"}
                </button>
            </div>
            <div className="log-filter__options">
                <div className="log-filter__options-title">Filtering options</div>
                <div className="log-filter__options-filters">
                    <button
                        className={`${useFilterHour ? "log-filter__options-button-on" : "log-filter__options-button-off"}`}
                        onClick={() => setUseFilterHour(!useFilterHour)}
                        disabled={!filter}
                    >
                        Time
                    </button>
                    <button
                        className={`${useFilterStatus ? "log-filter__options-button-on" : "log-filter__options-button-off"}`}
                        onClick={() => setUseFilterStatus(!useFilterStatus)}
                        disabled={!filter}
                    >
                        Last status
                    </button>
                </div>
            </div>
            <div className="log-filter__filtering">
                <div className="log-filter__filtering-title">Filters</div>
                <div className="log-filter__filtering-elements">
                    <input type="date" onChange={date => setFilterDate(new Date(date.target.value))} value={getDateInputFormat()}/>
                    {useFilterHour && (
                        <>
                            <select onChange={hour => setFilterHour(parseInt(hour.target.value))}>
                                {createHourOptions().map((data) => {
                                    let optionText = "";
                                    if (data < 10) {
                                        optionText = `0${data}:00`;
                                    } else {
                                        optionText = `${data}:00`;
                                    }

                                    return (
                                        <option value={data} key={data}>{optionText}</option>
                                    );
                                })}
                            </select>
                            <select onChange={data => setFilterTime(parseInt(data.target.value))}>
                                <option value={0}>0 min</option>
                                <option value={900000}>15 min</option>
                                <option value={1800000}>30 min</option>
                                <option value={2700000}>45 min</option>
                                <option value={3600000}>1 time</option>
                                <option value={7200000}>2 timer</option>
                                <option value={10800000}>3 timer</option>
                            </select>
                        </>
                    )}
                    {useFilterStatus && 
                        <select onChange={data => setLastStatusFilter(data.target.value)} value={filterStatus}>
                            <option value={AlarmLogType.SENT}>Sent</option>
                            <option value={AlarmLogType.DIPS}>Dips</option>
                            <option value={AlarmLogType.ESCALATE}>Escalate</option>
                            <option value={AlarmLogType.SNOOZE}>Snooze</option>
                            <option value={AlarmLogType.FIXED}>Fixed</option>
                        </select>
                    }
                </div>
            </div>
        </div>
    );
}

export default LogFilter;