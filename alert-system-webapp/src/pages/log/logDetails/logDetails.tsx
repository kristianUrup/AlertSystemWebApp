import React, { useEffect, useState } from "react";
import { GetFormattedDate } from "../../../data/AlarmLogService";
import { AlarmLog } from "../../../models/AlarmLog";
import "./logDetails.css"

interface LogDetailsProp {
    alarmLog: AlarmLog;
}
const LogDetails: React.FC<LogDetailsProp> = ({ alarmLog }) => {

    const [alarmHistory, setAlarmHistory] = useState<{ date: Date, status: string}[]>([]);
    
    useEffect(() => {
        const list = [
            {
                date: new Date(1606740918000),
                status: "Dips"
            },
            {
                date: new Date(1606741098000),
                status: "Escalate"
            },
            {
                date: new Date(1606741200000),
                status: "Snooze"
            },
            {
                date: new Date(1606741500000),
                status: "Snooze"
            },
            {
                date: new Date(1606741358000),
                status: "Fixed"
            },
        ];

        setAlarmHistory(list);
    }, []);


    return (
            <div className="log-details__body">
                <h2 className="log-details__body-title">Machine: </h2>
                <h2 className="log-details__body-title-machine">{alarmLog.machine.machineId}</h2>
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
                                <th>Last status</th>
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
                                            {data.status}
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