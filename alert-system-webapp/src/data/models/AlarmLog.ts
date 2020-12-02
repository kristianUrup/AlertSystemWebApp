import {Machine} from "../../models/Machine";
import {Alarm} from "../../models/Alarm";

export interface AlarmLog {
    machine: Machine,
    alarm: Alarm,
    date: number
}

