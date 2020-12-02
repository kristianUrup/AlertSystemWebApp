import {Machine} from "./Machine";
import {Alarm} from "./Alarm";

export interface AlarmLog {
    machine: Machine,
    alarm : Alarm,
    date: Date;
}

export enum AlarmLogType {
    SENT = "Sent",
    DIPS = "Dips",
    ESCALATE = "Escalate",
    SNOOZE = "Snooze",
    FIXED = "Fixed"
}

