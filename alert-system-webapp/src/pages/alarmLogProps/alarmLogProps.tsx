import React from 'react';
import { AlarmLog } from '../../models/AlarmLog';
import './alarmLogProps.css';
import {GetFormattedDate} from "../../data/AlarmService";

export interface AlarmLogProps {
    alarm: AlarmLog;
    open: boolean;
    handleClose: () => void;
}
export const AlarmLogs: React.FC<AlarmLogProps> = ({
                                                   alarm,
                                                   open = false,
                                                   handleClose,
                                               }) => {
    return (
        <div>
            <div className={"alarm__Log-border"}>
                <b>CLICKED ITEM</b>
                <p>MachineID: {alarm.machine.machineId}</p>
                <p>AlarmID: {alarm.alarm.alarmId}</p>
                <p>Date: {GetFormattedDate(alarm.date)}</p>
                <button
                    onClick={() => handleClose()}
                >
                    Close
                </button>
            </div>
        </div>
    );
};
