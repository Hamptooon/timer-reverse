import React, { useEffect } from "react";
import * as styles from "./TimerAlert.module.scss";

interface TimerAlertProps {
    onClose: () => void;
}

const TimerAlert: React.FC<TimerAlertProps> = ({ onClose }) => {
    // useEffect(() => {
    //     // Воспроизведение звукового сигнала
    //     // const audio = new Audio(
    //     //     "https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3"
    //     // );
    //     // audio.play();

    //     // Закрытие алерта через 6 секунд
    //     const timeout = setTimeout(() => {
    //         onClose();
    //     }, 6000);

    //     return () => {
    //         clearTimeout(timeout);
    //         // audio.pause();
    //     };
    // }, [onClose]);

    return (
        <div className={styles.alertOverlay}>
            <div className={styles.alertBox}>
                <div className={styles.alertContent}>
                    <div className={styles.alertIcon}>⏰</div>
                    <h2 className={styles.alertTitle}>Время истекло!</h2>
                    <p className={styles.alertMessage}>
                        Ваш таймер завершил отсчет
                    </p>
                    <button className={styles.closeButton} onClick={onClose}>
                        Закрыть
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TimerAlert;
