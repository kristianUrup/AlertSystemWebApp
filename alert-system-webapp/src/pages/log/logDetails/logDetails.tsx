import React, { useEffect, useState } from "react";
import { GetFormattedDate } from "../../../data/AlarmLogService";
import { AlarmLog, AlarmLogType } from "../../../models/AlarmLog";
import { LogTypeElement } from "../../../shared/alarmLogTypeColor/alarmLogTypeElement";
import "./logDetails.css"

interface LogDetailsProp {
    alarmLog: AlarmLog;
}
const LogDetails: React.FC<LogDetailsProp> = ({ alarmLog }) => {

    const [alarmHistory, setAlarmHistory] = useState<{ date: Date, status: AlarmLogType}[]>([]);
    
    useEffect(() => {
        const list = [
            {
                date: new Date(1606740918000),
                status: AlarmLogType.DIBS
            },
            {
                date: new Date(1606741098000),
                status: AlarmLogType.ESCALATE
            },
            {
                date: new Date(1606741200000),
                status: AlarmLogType.SNOOZE
            },
            {
                date: new Date(1606741500000),
                status: AlarmLogType.SNOOZE
            },
            {
                date: new Date(1606741538000),
                status: AlarmLogType.FIXED
            },
        ];

        setAlarmHistory(list);
    }, []);


    return (
            <div className="log-details__body">
                <h2 className="log-details__body-title">Machine Id: </h2>
                <h2 className="log-details__body-title-machine">{alarmLog.machine.machineId}</h2>
                <div className="log-details__info-box" style={{ marginBottom: "25px" }}>
                    <div className="log-details__info-box-row">
                        <label className="log-details__info-box-row-label">Machine name</label>
                        <label className="log-details__info-box-row-data">{alarmLog.machine.name}</label>
                    </div>
                    <div className="log-details__info-box-row">
                        <label className="log-details__info-box-row-label">Machine Type</label>
                        <label className="log-details__info-box-row-data">{alarmLog.machine.type}</label>
                    </div>
                </div>
                <div className="log-details__info-box">
                    <div className="log-details__info-box-row">
                        <label className="log-details__info-box-row-label">Alarm code</label>
                        <label className="log-details__info-box-row-data">{alarmLog.alarm.code}</label>
                    </div>
                    <div className="log-details__info-box-row">
                        <label className="log-details__info-box-row-label">Alarm description</label>
                        <label className="log-details__info-box-row-data">{alarmLog.alarm.description}</label>
                    </div>
                    <div className="log-details__info-box-row">
                        <label className="log-details__info-box-row-label">Occured</label>
                        <label className="log-details__info-box-row-data">{GetFormattedDate(alarmLog.date)}</label>
                    </div>
                </div>
                <h2 className="log-details__history-title">History</h2>
                <div className="log-details__history-container">
                    <table className="log-details__history">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {alarmHistory.map((data, index) => {
                                return (
                                    <tr key={`data-${index}`}>
                                        <td>
                                            {GetFormattedDate(data.date)}
                                        </td>
                                        <td>
                                            {LogTypeElement(data.status)}
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>)
}

export default LogDetails;