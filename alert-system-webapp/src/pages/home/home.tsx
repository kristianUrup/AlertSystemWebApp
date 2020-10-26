import React, { useEffect, useState } from 'react';
import {Alarm} from "../../models/Alarm";
import {GetAlarms, GetFormattedDate} from "../../data/AlarmService";
import AlarmLog from "../alarmLog/alarmLog";

const Home: React.FC = () => {
    const [alarms, setAlarms] = useState<Alarm[]>([]);
    const [open, setOpen] = useState(false);
    const [alarm, setAlarm] = useState<Alarm>();


    useEffect(() => {
        setAlarms(GetAlarms());
    }, []);

    const openPopUp = (data: Alarm) => {
        setOpen(true);
        setAlarm(data);
    };


    return (
    <div>
        <h1>Welcome to the Admin Page</h1>
        <h3>Alarm Log</h3>
        <div>
            {alarms.map((data, index) => {
                return (
                    <div key={`main-${index}`}
                         onClick={() => {
                             openPopUp(data);
                         }}
                    >
                        <div key={`id-${index}`}>
                            <p><b>ID: </b>{data.id.toString()}</p>
                        </div>
                        <div key={`alarmID-${index}`}>
                            <p><b>AlarmID: </b>{data.alarmId.toString()}</p>
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
            <AlarmLog
                open={open}
                handleClose={() => setOpen(false)}
                alarm={alarm}
            />
        )}
    </div>

)};

export default Home;
