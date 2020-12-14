import React, { useEffect, useState } from 'react';
import {GetAlarms} from "../../data/AlarmLogService";
import {AlarmLog} from "../../models/AlarmLog";
import './log.css';
import LogDetails from './logDetails/logDetails';
import LogFilter from './logFilter/logFilter';
import LogTable from './logTable/logTable';
import {CheckAuth, SetLogout} from "../../data/AuthService";
import { useHistory } from "react-router-dom";

const Log: React.FC = () => {
    const [alarmLogs, setAlarmLogs] = useState<AlarmLog[]>([]);
    const [alarm, setAlarm] = useState<AlarmLog>();
    const [loading, setLoading] = useState(false);
    const [filterList, setFilterList] = useState<AlarmLog[]>([]);
    let history = useHistory();


    const Logout = () => {
        if(SetLogout()){
            history.push('/');
        }
    };

    useEffect(() => {
        setLoading(true);
        GetAlarms().then(list => {
            setAlarmLogs(list);
            setFilterList(list);
        }).finally(() => {
            setLoading(false);
        });
    }, []);

    return (
        <div className="log__page">
            <div className="log__header">
                {CheckAuth() ?
                    <button className="log_logout-btn" onClick={Logout}>Logout </button> : ""}
            </div>
            <div className="log__table-container">
                <div className="log__table-filter-container">
                    <LogFilter alarmLogs={alarmLogs} setAlarmLogs={als => setFilterList(als)} />
                </div>
                <div className="log__table-data-container">
                    {filterList.length > 0 && <LogTable alarmLogs={filterList} setAlarm={al => setAlarm(al)}/>}
                    {filterList.length === 0 && (
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
