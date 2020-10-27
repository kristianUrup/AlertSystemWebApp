import {Alarm} from '../models/Alarm';

export const GetAlarms = async (): Promise<Alarm[]> => {
    return await GetAlarmsFromApiAsync();
};

export const GetFormattedDate = (dateNumber: number) : string => {

    let dateToFormat = new Date(dateNumber);
    return `${dateToFormat.getDate()}/${dateToFormat.getMonth()}/${dateToFormat.getFullYear()} ${dateToFormat.getHours()}:${dateToFormat.getMinutes()}`;
};

const GetAlarmsFromApiAsync = async (): Promise<Alarm[]> => {
    return await fetch('https://api.mocki.io/v1/38a5fde6').then(response => response.json());
};

