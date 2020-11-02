import {Machine} from "../../models/Machine";
import {Alarm} from "../../models/Alarm";

export interface AlarmLog {
    machineID: Machine,
    alarmID : Alarm,
    date: number
}

