// File: src/components/TimerContainer/TimerContainer.tsx
import React, { useState, useEffect, useLayoutEffect } from "react";
import TimerForm from "../TimerForm/TimerForm";
import TimerDisplay from "../TimerDisplay/TimerDisplay";
import TimerControls from "../TimerControls/TimerControls";
import TimerAlert from "../TimerAlert/TimerAlert";
import * as styles from "./TimerContainer.module.scss";

const TimerContainer: React.FC = () => {
    const [timeInSeconds, setTimeInSeconds] = useState<number>(0);
    const [isActive, setIsActive] = useState<boolean>(false);
    const [showAlert, setShowAlert] = useState<boolean>(false);

    useEffect(() => {
        const savedState = localStorage.getItem("timerState");
        if (savedState) {
            const {
                timeInSeconds: savedTime,
                isActive: savedIsActive,
                lastUpdated: savedLastUpdated,
            } = JSON.parse(savedState);
            console.log(
                "Сохраненное состояние таймера:",
                Date.now() - savedLastUpdated
            );
            if (savedIsActive) {
                const elapsed = (Date.now() - savedLastUpdated) / 1000;
                const newTime = Math.max(Math.ceil(savedTime - elapsed), 0);

                setTimeInSeconds(newTime);
                setIsActive(newTime > 0);
                if (newTime === 0) setShowAlert(true);
            } else {
                setTimeInSeconds(savedTime);
                setIsActive(false);
            }
        }
    }, []);

    useEffect(() => {
        const state = {
            timeInSeconds,
            isActive,
            lastUpdated: Date.now(),
        };
        localStorage.setItem("timerState", JSON.stringify(state));
        console.log("Состояние таймера сохранено:", state);
    }, [timeInSeconds, isActive]);

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (isActive && timeInSeconds > 0) {
            interval = setInterval(() => {
                setTimeInSeconds((prev) => {
                    if (prev <= 1) {
                        setIsActive(false);
                        setShowAlert(true);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [isActive, timeInSeconds]);
    const handleTimeChange = (newMinutes: number, newSeconds: number) => {
        if (isActive) return;
        const totalSeconds = newMinutes * 60 + newSeconds;
        setTimeInSeconds(totalSeconds);
    };

    const handleStart = () => {
        if (timeInSeconds > 0) {
            setIsActive(true);
        }
    };

    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;

    return (
        <div className={styles.timerContainer}>
            <TimerForm
                minutes={minutes}
                seconds={seconds}
                onTimeChange={handleTimeChange}
                disabled={isActive}
            />
            <TimerDisplay minutes={minutes} seconds={seconds} />
            <TimerControls
                isActive={isActive}
                onStart={handleStart}
                onPause={() => setIsActive(false)}
                onReset={() => {
                    setIsActive(false);
                    setTimeInSeconds(0);
                }}
            />
            {showAlert && <TimerAlert onClose={() => setShowAlert(false)} />}
        </div>
    );
};

export default TimerContainer;
