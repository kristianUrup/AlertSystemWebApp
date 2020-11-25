import React, { useEffect, useState } from 'react';
import {GetAlarms, GetFormattedDate} from "../../data/AlarmService";
import {AlarmLog} from "../../models/AlarmLog";
import {AlarmLogs} from "../alarmLogProps/alarmLogProps";
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
            <h1>Alarm Log</h1>
            <button className={"log__home-button"} onClick={handleClick}>
                Home
            </button>
            <table className="log__table">
                <thead>
                    <tr>
                        <th>Machine ID</th>
                        <th>Alarm Code</th>
                        <th>Date</th>
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
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            {open && alarm && (
                <AlarmLogs open={open} handleClose={() => setOpen(false)} alarm={alarm}/>
            )}
        </div>
)};

export default Log;
