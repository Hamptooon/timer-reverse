// File: src/components/TimerForm/TimerForm.tsx
import React from "react";
import * as styles from "./TimerForm.module.scss";

interface TimerFormProps {
    minutes: number;
    seconds: number;
    onTimeChange: (minutes: number, seconds: number) => void;
    disabled: boolean;
}

const TimerForm: React.FC<TimerFormProps> = ({
    minutes,
    seconds,
    onTimeChange,
    disabled,
}) => {
    const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        onTimeChange(isNaN(value) ? 0 : Math.max(0, value), seconds);
    };

    const handleSecondsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value);
        onTimeChange(
            minutes,
            isNaN(value) ? 0 : Math.max(0, Math.min(59, value))
        );
    };

    const handleMinutesIncrement = () => {
        onTimeChange(minutes + 1, seconds);
    };

    const handleMinutesDecrement = () => {
        onTimeChange(Math.max(0, minutes - 1), seconds);
    };

    const handleSecondsIncrement = () => {
        if (seconds === 59) {
            onTimeChange(minutes + 1, 0);
        } else {
            onTimeChange(minutes, seconds + 1);
        }
    };

    const handleSecondsDecrement = () => {
        if (seconds === 0 && minutes > 0) {
            onTimeChange(minutes - 1, 59);
        } else {
            onTimeChange(minutes, Math.max(0, seconds - 1));
        }
    };

    return (
        <div className={styles.timerForm}>
            <div className={styles.inputGroup}>
                <label htmlFor="minutes">Минуты:</label>
                <div className={styles.inputWithControls}>
                    <button
                        type="button"
                        className={styles.controlButton}
                        onClick={handleMinutesDecrement}
                        disabled={disabled}
                    >
                        −
                    </button>
                    <input
                        id="minutes"
                        type="number"
                        min="0"
                        value={minutes}
                        onChange={handleMinutesChange}
                        className={styles.timeInput}
                        disabled={disabled}
                    />
                    <button
                        type="button"
                        className={styles.controlButton}
                        onClick={handleMinutesIncrement}
                        disabled={disabled}
                    >
                        +
                    </button>
                </div>
            </div>

            <div className={styles.inputGroup}>
                <label htmlFor="seconds">Секунды:</label>
                <div className={styles.inputWithControls}>
                    <button
                        type="button"
                        className={styles.controlButton}
                        onClick={handleSecondsDecrement}
                        disabled={disabled}
                    >
                        −
                    </button>
                    <input
                        id="seconds"
                        type="number"
                        min="0"
                        max="59"
                        value={seconds}
                        onChange={handleSecondsChange}
                        className={styles.timeInput}
                        disabled={disabled}
                    />
                    <button
                        type="button"
                        className={styles.controlButton}
                        onClick={handleSecondsIncrement}
                        disabled={disabled}
                    >
                        +
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TimerForm;
