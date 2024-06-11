import React, { useState, useEffect, useRef } from "react";

interface TimerProps {
  minutesPerItem: number;
  onTimerEnd: () => void;
  onTimerPause: (isPaused: boolean) => void;
  resetFlag: boolean;
}

const Timer: React.FC<TimerProps> = ({
  minutesPerItem,
  onTimerEnd,
  onTimerPause,
  resetFlag,
}) => {
  const [timeLeft, setTimeLeft] = useState<number>(minutesPerItem * 60);
  const [isActive, setIsActive] = useState<boolean>(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      intervalRef.current = window.setTimeout(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      onTimerEnd();
    }
    return () => {
      if (intervalRef.current !== null) {
        clearTimeout(intervalRef.current);
      }
    };
  }, [timeLeft, isActive]);

  useEffect(() => {
    setTimeLeft(minutesPerItem * 60);
    setIsActive(false);
  }, [resetFlag, minutesPerItem]);

  useEffect(() => {
    onTimerPause(!isActive);
  }, [isActive]);

  const handlePause = () => {
    setIsActive(false);
  };

  const handlePlay = () => {
    setIsActive(true);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <div>
      <h2>Timer</h2>
      <h3>{formatTime(timeLeft)}</h3>
      {isActive ? (
        <button onClick={handlePause}>Pause</button>
      ) : (
        <button onClick={handlePlay}>Play</button>
      )}
    </div>
  );
};

export default Timer;
