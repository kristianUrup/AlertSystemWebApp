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
        <div>
            <h1> Alarm Log</h1>
            <button className={"log__home-button"} onClick={handleClick}>
                Home
            </button>
            <div>
                <div className={"log__body-list-title-row"}>
                    <div className={"log__body-list-title-col"}>Machine ID</div>
                    <div className={"log__body-list-title-col"}>Alarm Code</div>
                    <div className={"log__body-list-title-col"}>Date</div>
                </div>
            </div>
        <div className={"log__body-list"}>
            {alarms.map((data, index) => {
            return (
                <div key={`main-${index}`}
                    className={"log__body-list-row"}
                    onClick={() => {
                    openPopUp(data);
                }}>
                    <div className={"log__body-list-col"}>
                        <div key={`machine-${index}`}>
                            {data.machine.machineId} 
                        </div>
                    </div>
                    <div className={"log__body-list-col"}>
                        <div key={`alarm-${index}`}>
                            {data.alarm.code} 
                        </div>
                    </div>
                    <div className={"log__body-list-col"}>
                        <div key={`date-${index}`}>
                        {GetFormattedDate(data.date)} </div>
                    </div>
                </div>
            )})}
        </div>

    {open && alarm && (
        <AlarmLogs open={open} handleClose={() => setOpen(false)} alarm={alarm}/>
    )}

    </div>
)};

export default Log;
