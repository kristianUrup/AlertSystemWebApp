import React from 'react';
import { Alarm } from '../../models/Alarm';
import './alarmLog.css';
import {GetFormattedDate} from "../../data/AlarmService";

export interface AlarmLogProps {
    alarm: Alarm;
    open: boolean;
    handleClose: () => void;
}
const AlarmLog: React.FC<AlarmLogProps> = ({
                                                   alarm,
                                                   open = false,
                                                   handleClose,
                                               }) => {
    return (
        <div>
            <div></div>
            <div>
                <b>CLICKED ITEM</b>
                <p>ID: {alarm.id.toString()}</p>
                <p>AlarmID: {alarm.alarmId.toString()}</p>
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

export default AlarmLog;
