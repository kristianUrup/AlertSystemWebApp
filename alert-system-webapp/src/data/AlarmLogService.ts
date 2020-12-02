import {AlarmLog} from './models/AlarmLog';
import {AlarmLog as AlarmLogModel} from '../models/AlarmLog';

export const GetAlarms = async (): Promise<AlarmLogModel[]> => {
    const alarmLogs: AlarmLog[] = await fetch('http://localhost:7071/api/alarmlog').then(response => response.json());

    return alarmLogs.map(alarmLog => ({
        alarm: alarmLog.alarm,
        machine: alarmLog.machine,
        date: new Date(alarmLog.date)
    }));
};

export const GetFormattedDate = (dateToFormat: Date) : string => {

    const date = ConvertOneDecimalToTwo(dateToFormat.getDate());
    const month = ConvertOneDecimalToTwo(dateToFormat.getMonth() + 1); //First month is index zero. So plus one for the correct month
    const year = dateToFormat.getFullYear();
    const hours = ConvertOneDecimalToTwo(dateToFormat.getHours());
    const minutes = ConvertOneDecimalToTwo(dateToFormat.getMinutes());

    const formattedDate = `${date}/${month}/${year} ${hours}:${minutes}`

    return formattedDate;
};

const ConvertOneDecimalToTwo = (decimal: number) : string => {
    if (decimal < 10) {
        return `0${decimal}`
    }

    return `${decimal}`
}
