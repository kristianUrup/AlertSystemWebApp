import {AlarmLog} from '../models/AlarmLog';

export const GetAlarms = async (): Promise<AlarmLog[]> => {
    return await fetch('http://localhost:7071/api/AlarmLog').then(response => response.json());
};

export const GetFormattedDate = (dateNumber: number) : string => {
    let dateToFormat = new Date(dateNumber);
    return `${dateToFormat.getDate()}/${dateToFormat.getMonth()}/${dateToFormat.getFullYear()} ${dateToFormat.getHours()}:${dateToFormat.getMinutes()}`;
};
