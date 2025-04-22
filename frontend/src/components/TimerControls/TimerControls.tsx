import React from "react";
import * as styles from "./TimerControls.module.scss";

interface TimerControlsProps {
    isActive: boolean;
    onStart: () => void;
    onPause: () => void;
    onReset: () => void;
}

const TimerControls: React.FC<TimerControlsProps> = ({
    isActive,
    onStart,
    onPause,
    onReset,
}) => {
    return (
        <div className={styles.controls}>
            {!isActive ? (
                <button
                    className={`${styles.controlButton} ${styles.startButton}`}
                    onClick={onStart}
                >
                    Старт
                </button>
            ) : (
                <button
                    className={`${styles.controlButton} ${styles.pauseButton}`}
                    onClick={onPause}
                >
                    Пауза
                </button>
            )}
            <button
                className={`${styles.controlButton} ${styles.resetButton}`}
                onClick={onReset}
            >
                Сброс
            </button>
        </div>
    );
};

export default TimerControls;
