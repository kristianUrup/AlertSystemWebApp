import {Alarm} from '../models/Alarm';
import {Guid} from "guid-typescript";

export const GetAlarms = () : Alarm[] => {
    return alarmList;
};

export const GetFormattedDate = (dateToFormat: Date) : string => {
    const something : string = `${dateToFormat.getDate()}/${dateToFormat.getMonth()}/${dateToFormat.getFullYear()} ${dateToFormat.getHours()}:${dateToFormat.getMinutes()}`;
    return something;

};

const alarmList: Alarm[] = [
    {
        id : Guid.create(),
        alarmId : Guid.create(),
        date : new Date(400000000000)
    },
    {
        id : Guid.create(),
        alarmId : Guid.create(),
        date : new Date(500000000000)
    },
    {
        id : Guid.create(),
        alarmId : Guid.create(),
        date : new Date(480000000000)
    }
];
