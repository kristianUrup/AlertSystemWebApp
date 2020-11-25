import React, { useEffect, useState } from 'react';
import {GetAlarms, GetFormattedDate} from "../../data/AlarmService";
import {AlarmLog} from "../../models/AlarmLog";
import './log.css';
import { useHistory } from "react-router-dom";

const Log: React.FC = () => {
    const [alarms, setAlarms] = useState<AlarmLog[]>([]);
    const [open, setOpen] = useState(false);
    const [alarm, setAlarm] = useState<AlarmLog>();

    useEffect(() => {
        GetAlarms().then(list => {
            setAlarms(list);
        });
    }, []);

    const openPopUp = (data: AlarmLog) => {
        setOpen(true);
        setAlarm(data);
    };

    let history = useHistory();

    function handleClick() {
        history.push('/')
    }

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
                                <tr key={`data-${index}`} onClick={() => openPopUp(data)}>
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
                {alarm && (
                    <div>
                        <h1>Details</h1>
                        <h2>Alarm code: {alarm.alarm.code}</h2>
                        <h2>Alarm description: {alarm.alarm.description}</h2>
                        <h2>Occured: {GetFormattedDate(alarm.date)}</h2>
                        <h2>From machine: {alarm.machine.machineId}</h2>
                    </div>
                )}
            </div>
        </div>
)};

export default Log;
