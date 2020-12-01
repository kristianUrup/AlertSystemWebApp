import React, { useEffect, useState } from 'react';
import {GetAlarms} from "../../data/AlarmLogService";
import {AlarmLog} from "../../models/AlarmLog";
import './log.css';
import LogDetails from './logDetails/logDetails';
import LogTable from './logTable/logTable';

const Log: React.FC = () => {
    const [alarms, setAlarms] = useState<AlarmLog[]>([]);
    const [alarm, setAlarm] = useState<AlarmLog>();

    useEffect(() => {
        GetAlarms().then(list => {
            setAlarms(list);
        });
    }, []);

    return (
        <div className="log__page">
            <div className="log__header">

            </div>
            <div className="log__table-container">
                {alarms.length > 0 && <LogTable alarmLogs={alarms} setAlarm={al => setAlarm(al)}/>}
                {alarms.length === 0 && (
                    <div className="log__table-container-no-alarms">
                        <h1>No alarm logs could be found</h1>
                    </div>
                )}
            </div>
            <div className="log__details">
                {alarm && <LogDetails alarmLog={alarm}/>}
            </div>
        </div>
)};

export default Log;
