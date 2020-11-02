import React, { useEffect, useState } from 'react';
import {GetAlarms, GetFormattedDate} from "../../data/AlarmService";
import {AlarmLog} from "../../models/AlarmLog";
import {AlarmLogs} from "../alarmLogProps/alarmLogProps";

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


    return (
        <div>
    <h3>Alarm Log</h3>
    <div>
    {alarms.map((data, index) => {
            return (
                <div key={`main-${index}`}
            onClick={() => {
                openPopUp(data);
            }}
        >
            <div key={`machine-${index}`}>
            <p><b>Machine: </b>{data.machine.machineId}</p>
            </div>
            <div key={`alarm-${index}`}>
            <p><b>Alarm: </b>{data.alarm.alarmId}</p>
            </div>
            <div key={`date-${index}`}>
            <p><b>Date: </b>{GetFormattedDate(data.date)}</p>
            </div>
            ---------
                </div>
        );
        })}
    </div>
    {open && alarm && (
        <AlarmLogs
            open={open}
        handleClose={() => setOpen(false)}
        alarm={alarm}
        />
    )}
    </div>

)};

export default Log;
