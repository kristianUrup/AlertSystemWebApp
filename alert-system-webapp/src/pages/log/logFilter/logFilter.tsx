import React, { useEffect, useState } from "react";
import { AlarmLog } from "../../../models/AlarmLog";
import "./logFilter.css"

interface LogFilterProps {
    alarmLogs: AlarmLog[];
    setAlarmLogs(data: AlarmLog[]): void; 
}

const LogFilter: React.FC<LogFilterProps> = ({ alarmLogs, setAlarmLogs }) => {
    
    const [filterList] = useState<AlarmLog[]>([]);
    const [filterDate, setFilterDate] = useState<Date>();
    const [filterHour, setFilterHour] = useState(0);
    const [filterTime, setFilterTime] = useState(0);
    const [filter, setFilter] = useState(false);
    const [useFilterHour, setUseFilterHour] = useState(false);
    const [useFilterStatus, setUseFilterStatus] = useState(false);
    const [ascend, setAscend] = useState(false);

    const filterAlarmLogs = () => {
        let filteredList = [];

        if (filterDate) {
            filteredList = alarmLogs.filter(data => checkIfDateIsEqual(data.date));

            if (useFilterHour) {
                filteredList = filteredList.filter(data => checkIfDateIsInTimeFrame(data.date));
            }
            setAlarmLogs(filteredList);
        }
        console.log("filterAlarmLogs was called");
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

    const changesOrderOfList = () => {
        let sortedList: AlarmLog[] = [];

        sortedList = filterList.sort((a, b)=> {
            if (ascend) {
                return b.date.getTime() - a.date.getTime();
            } else {
                return a.date.getTime() - b.date.getTime();
            }
        });

        setAlarmLogs(sortedList);
        console.log("changesOrderOfList was called");
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
            const month = filterDate.getMonth() < 10 ? `0${filterDate.getMonth()}` : `${filterDate.getMonth()}`
            const date = filterDate.getDate() < 10 ? `0${filterDate.getDate()}` : `${filterDate.getDate()}`
            return `${filterDate.getFullYear()}-${month}-${date}`;
        } else {
            return "";
        }
    }

    const resetInputs = () => {
        setFilterDate(undefined);
        setFilterHour(0);
        setFilterTime(0);
        setUseFilterHour(false);
        setUseFilterStatus(false);
    }

    useEffect(() => {
        if (filter) {
            filterAlarmLogs();
        } else {
            setAlarmLogs(alarmLogs);
            resetInputs();
        }
    }, [filterDate, filter, filterHour, filterTime, useFilterHour, useFilterStatus])

    useEffect(() => {
        if (filter) {
            changesOrderOfList();
        }
    }, [ascend])
    
    return (
        <div className="log-filter__container">
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
                <select>
                    <option>Sent</option>
                    <option>Dips</option>
                    <option>Escalate</option>
                    <option>Snooze</option>
                    <option>Fixed</option>
                </select>
            }
            <div>
                <p>Filtering: </p>
                <button onClick={() => setFilter(!filter)}>
                    {filter ? "ON" : "OFF"}
                </button>
                <button onClick={() => setAscend(!ascend)} disabled={!filter}>
                    {ascend ? "ASC" : "DESC"}
                </button>
            </div>
            {filter && 
                <div>
                    <p>Filter options: </p>
                    <button 
                        onClick={() => setUseFilterHour(!useFilterHour)}
                        style={{ backgroundColor: useFilterHour ? "#56b1db" : "" }}
                    >
                        Use time
                    </button>
                    <button
                        onClick={() => setUseFilterStatus(!useFilterStatus)}
                        style={{ backgroundColor: useFilterStatus ? "#56b1db" : "" }}
                    >
                        Use last status
                    </button>
                </div>
            }
        </div>
    );
}

export default LogFilter;