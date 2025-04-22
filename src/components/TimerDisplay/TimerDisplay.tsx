import React from "react";
import * as styles from "./TimerDisplay.module.scss";

interface TimerDisplayProps {
    minutes: number;
    seconds: number;
}

const TimerDisplay: React.FC<TimerDisplayProps> = ({ minutes, seconds }) => {
    const formatTime = (value: number): string => {
        return value.toString().padStart(2, "0");
    };

    return (
        <div className={styles.timerDisplay}>
            <div className={styles.timeValue}>{formatTime(minutes)}</div>
            <div className={styles.separator}>:</div>
            <div className={styles.timeValue}>{formatTime(seconds)}</div>
        </div>
    );
};

export default TimerDisplay;
