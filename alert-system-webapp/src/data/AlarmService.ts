import { Guid } from 'guid-typescript';
import Alarm from "../models/Alarm";

export const GetAlarms = () : Alarm[] => {
    return alarmList;
};

const alarmList: Alarm[] = [
    {
        id : Guid.create(),
        alarmId : Guid.create(),
        date : Date.now()
    },
    {
        id : Guid.create(),
        alarmId : Guid.create(),
        date : new Date(500000000000)
    },
    {
        id : Guid.create(),
        alarmId : Guid.create(),
        date : Date.now()
    }
];
