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
    DIPS = "Dips",
    ESCALATE = "Escalate",
    SNOOZE = "Snooze",
    FIXED = "Fixed"
}

