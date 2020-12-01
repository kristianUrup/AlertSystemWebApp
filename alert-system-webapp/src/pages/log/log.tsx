import React, { useEffect, useState } from 'react';
import {GetAlarms, GetFormattedDate} from "../../data/AlarmService";
import {AlarmLog} from "../../models/AlarmLog";
import './log.css';
import LogDetails from './logDetails/logDetails';

const Log: React.FC = () => {
    const [alarms, setAlarms] = useState<AlarmLog[]>([]);
    const [alarm, setAlarm] = useState<AlarmLog>();
    const [alarmHistory, setAlarmHistory] = useState<{ date: number, status: string}[]>([]);

    useEffect(() => {
        GetAlarms().then(list => {
            setAlarms(list);
        });
    }, []);

    useEffect(() => {
        const list = [
            {
                date: 1606740918000,
                status: "Dips"
            },
            {
                date: 1606741098000,
                status: "Escalate"
            },
            {
                date: 1606741200000,
                status: "Snooze"
            },
            {
                date: 1606741500000,
                status: "Snooze"
            },
            {
                date: 1606741358000,
                status: "Fixed"
            },
        ];

        setAlarmHistory(list);
    }, []);

    return (
        <div className="log__page">
            <div className="log__header">

            </div>
            <div className="log__table-container">
                <table className="log__table">
                    <thead>
                        <tr>
                            <th>Machine ID</th>
                            <th>Alarm Code</th>
                            <th>Date</th>
                            <th>Last status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {alarms.map((data, index) => {
                            return (
                                <tr key={`data-${index}`} onClick={() => setAlarm(data)}>
                                    <td>
                                        {data.machine.machineId}
                                    </td>
                                    <td>
                                        {data.alarm.code}
                                    </td>
                                    <td>
                                        {GetFormattedDate(data.date)}
                                    </td>
                                    <td>
                                        Fixed
                                    </td>
                                </tr>
                            )
                        })}
                </tbody>
            </table>
            </div>
            <div className="log__details">
                {alarm && <LogDetails alarmLog={alarm}/>}
            </div>
        </div>
)};

export default Log;
