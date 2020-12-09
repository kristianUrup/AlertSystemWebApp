import {Machine} from "./Machine";
import {Alarm} from "./Alarm";

export interface AlarmLog {
    machine: Machine,
    alarm : Alarm,
    date: Date;
    lastStatus: AlarmLogType;
}

export enum AlarmLogType {
    SENT = "Sent",
    DIBS = "Dibs",
    ESCALATE = "Escalate",
    SNOOZE = "Snooze",
    FIXED = "Fixed"
}

