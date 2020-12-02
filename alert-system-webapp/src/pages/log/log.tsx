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

    useEffect(() => {
        setLoading(true);
        GetAlarms().then(list => {
            setAlarms(list);
        }).finally(() => {
            setLoading(false);
        });
    }, []);

    return (
        <div className="log__page">
            <div className="log__header">

            </div>
            <div className="log__table-container">
                <div className="log__table-filter-container">
                    <input type="date"/>
                    <select>
                        <option>13:00</option>
                        <option>14:00</option>
                        <option>15:00</option>
                    </select>
                    <select>
                        <option>15 min</option>
                        <option>30 min</option>
                        <option>45 min</option>
                        <option>1 time</option>
                        <option>2 timer</option>
                        <option>3 timer</option>
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
                        <button>ON</button>
                    </div>
                </div>
                <div className="log__table-data-container">
                    {alarms.length > 0 && <LogTable alarmLogs={alarms} setAlarm={al => setAlarm(al)}/>}
                    {alarms.length === 0 && (
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
