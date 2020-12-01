import React from "react";
import { AlarmLogType } from "../../models/AlarmLog";

export const LogTypeElement = (alt: AlarmLogType) => {

    const GetColorForType = (): string => {
        switch (alt) {
            case AlarmLogType.DIPS:
                return "#fcf000";
            case AlarmLogType.ESCALATE:
                return "#ff7b00"
            case AlarmLogType.FIXED:
                return "#4ae059"
            case AlarmLogType.SENT:
                return "#c91818"
            case AlarmLogType.SNOOZE:
                return "#4a7ae0"
        }
    }

    return <p style={{ color: GetColorForType() }}>{alt}</p>
}