import React from "react";
import { GetFormattedDate } from "../../../data/AlarmLogService";
import { AlarmLog, AlarmLogType } from "../../../models/AlarmLog";
import { LogTypeElement } from "../../../shared/alarmLogTypeColor/alarmLogTypeElement";
import "./logTable.css"

interface LogTableProps {
    alarmLogs: AlarmLog[];
    setAlarm(data: AlarmLog): void;
}

const LogTable: React.FC<LogTableProps> = ({ alarmLogs, setAlarm }) => {
    return (
        <table className="log-table">
            <thead>
                <tr>
                    <th>Machine</th>
                    <th>Alarm Code</th>
                    <th>Date</th>
                    <th>Last status</th>
                </tr>
                </thead>
            <tbody>
                {alarmLogs.map((data, index) => {
                    return (
                        <tr key={`data-${index}`} onClick={() => setAlarm(data)}>
                            <td>
                                {data.machine.name ? data.machine.name : "None"} | {data.machine.type ? data.machine.type : "None"}
                            </td>
                            <td>
                                {data.alarm.code}
                            </td>
                            <td>
                                {GetFormattedDate(data.date)}
                            </td>
                            <td>
                                {LogTypeElement(data.lastStatus)}
                            </td>
                            </tr>
                        )
                    })}
            </tbody>
        </table>
    );
}

export default LogTable;