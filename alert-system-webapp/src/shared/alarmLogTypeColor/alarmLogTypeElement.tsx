import React, { useEffect, useState } from "react";
import { AlarmLogType } from "../../models/AlarmLog";

export const LogTypeElement = (alt: AlarmLogType) => {
    const [typeColor, setTypeColor] = useState("");

    useEffect(() => {
        GetColorForType();
    });

    const GetColorForType = () => {
        switch (alt) {
            case AlarmLogType.DIPS:
                setTypeColor("#fcf000");
                break;
            case AlarmLogType.ESCALATE:
                setTypeColor("#ff7b00");
                break;
            case AlarmLogType.FIXED:
                setTypeColor("#4ae059");
                break;
            case AlarmLogType.SENT:
                setTypeColor("#c91818");
                break;
            case AlarmLogType.SNOOZE:
                setTypeColor("#4a7ae0");
                break;
        }
    }

    return <p style={{ color: typeColor }}>{alt}</p>
}