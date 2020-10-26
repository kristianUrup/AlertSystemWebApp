import { Guid } from "guid-typescript";

export interface Alarm {
    id: Guid,
    alarmId : Guid,
    date: Date
}
