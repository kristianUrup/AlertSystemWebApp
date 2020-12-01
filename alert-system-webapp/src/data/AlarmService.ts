import {AlarmLog} from '../models/AlarmLog';

export const GetAlarms = async (): Promise<AlarmLog[]> => {
    return await fetch('http://localhost:7071/api/AlarmLog').then(response => response.json());
};

export const GetFormattedDate = (dateNumber: number) : string => {
    let dateToFormat = new Date(dateNumber);

    const date = ConvertOneDecimalToTwo(dateToFormat.getUTCDate());
    const month = ConvertOneDecimalToTwo(dateToFormat.getUTCMonth() + 1); //First month is index zero. So plus one for the correct month
    const year = dateToFormat.getUTCFullYear();
    const hours = ConvertOneDecimalToTwo(dateToFormat.getUTCHours());
    const minutes = ConvertOneDecimalToTwo(dateToFormat.getUTCMinutes());

    const formattedDate = `${date}/${month}/${year} ${hours}:${minutes}`

    return formattedDate;
};

const ConvertOneDecimalToTwo = (decimal: number) : string => {
    if (decimal < 10) {
        return `0${decimal}`
    }

    return `${decimal}`
}
