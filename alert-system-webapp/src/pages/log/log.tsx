import React, { useEffect, useState } from 'react';
import {GetAlarms} from "../../data/AlarmLogService";
import {AlarmLog} from "../../models/AlarmLog";
import './log.css';
import LogDetails from './logDetails/logDetails';
import LogTable from './logTable/logTable';

const Log: React.FC = () => {
    const [alarms, setAlarms] = useState<AlarmLog[]>([]);
    const [alarm, setAlarm] = useState<AlarmLog>();
    const [loading, setLoading] = useState(false);
    const [filterList, setFilterList] = useState<AlarmLog[]>([]);
    const [filterDate, setFilterDate] = useState<Date>();
    const [filterHour, setFilterHour] = useState(0);
    const [filterTime, setFilterTime] = useState(0);
    const [filter, setFilter] = useState(false);
    const [ascend, setAscend] = useState(false);

    useEffect(() => {
        setLoading(true);
        GetAlarms().then(list => {
            setAlarms(list);
            setFilterList(list);
        }).finally(() => {
            setLoading(false);
        });
    }, []);

    const filterAlarmLogs = () => {
        let filteredList = [];

        if (filterDate) {
            filteredList = alarms.filter(data => checkIfDateIsEqual(data.date));

            filteredList = filteredList.filter(data => checkIfDateIsInTimeFrame(data.date));
            setFilterList(filteredList);
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
        const sortedList = filterList.sort((a, b) => {
            if (ascend) {
                return b.date.getTime() - a.date.getTime();
            } else {
                return a.date.getTime() - b.date.getTime();
            }
        });
        setFilterList(sortedList);
        console.log("changesOrderOfList was called");
    }

    const createHourOptions = () => {
        const numbers: number[] = [];
        for (let i = 0; i < 24; i++) {
            numbers.push(i);
        }
        return numbers;
    }

    useEffect(() => {
        if (filter) {
            filterAlarmLogs();
        } else {
            setFilterList(alarms);
        }
    }, [filterDate, filter, filterHour, filterTime])

    useEffect(() => {
        changesOrderOfList();
    }, [ascend])

    return (
        <div className="log__page">
            <div className="log__header">

            </div>
            <div className="log__table-container">
                <div className="log__table-filter-container">
                    <input type="date" onChange={date => setFilterDate(new Date(date.target.value))}/>
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
                            )
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
                    <select>
                        <option>Sent</option>
                        <option>Dips</option>
                        <option>Escalate</option>
                        <option>Snooze</option>
                        <option>Fixed</option>
                    </select>
                    <div>
                        <p>Filtering: </p>
                        <button onClick={() => setFilter(!filter)}>
                            {filter ? "ON" : "OFF"}
                        </button>
                        <button onClick={() => setAscend(!ascend)} disabled={!filter}>
                            {ascend ? "ASC" : "DESC"}
                        </button>
                    </div>
                </div>
                <div className="log__table-data-container">
                    {filterList.length > 0 && <LogTable alarmLogs={filterList} setAlarm={al => setAlarm(al)}/>}
                    {filterList.length === 0&& (
                        <div className="log__table-container-no-alarms">
                            {!loading && <h1>No alarm logs could be found</h1>}
                            {loading && <h1>Loading all logs...</h1>}
                        </div>
                    )}
                </div>
            </div>
            <div className="log__details">
                {alarm && <LogDetails alarmLog={alarm}/>}
            </div>
        </div>
)};

export default Log;
