import {Machine} from "./Machine";
import {Alarm} from "./Alarm";

export interface AlarmLog {
    machine: Machine,
    alarm : Alarm,
    date: Date;
}

