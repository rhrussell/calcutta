import React, { useState, useEffect } from 'react';

interface TimerProps {
  minutesPerItem: number;
  onTimerEnd: () => void;
  resetFlag: boolean;
}

const Timer: React.FC<TimerProps> = ({ minutesPerItem, onTimerEnd, resetFlag }) => {
  const [time, setTime] = useState(minutesPerItem * 60);
  const [isActive, setIsActive] = useState(true);
  const [isNextTeamVisible, setIsNextTeamVisible] = useState(false);

  useEffect(() => {
    setTime(minutesPerItem * 60);
    setIsActive(true);
    setIsNextTeamVisible(false);
  }, [resetFlag, minutesPerItem]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive) {
      interval = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime === 0) {
            setIsActive(false);
            setIsNextTeamVisible(true);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else if (!isActive && time !== 0) {
      clearInterval(interval!);
    }

    return () => clearInterval(interval!);
  }, [isActive, time, minutesPerItem]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const handleNextTeamClick = () => {
    setIsNextTeamVisible(false);
    setIsActive(true);
    setTime(minutesPerItem * 60);
    onTimerEnd();  // Call onTimerEnd to update the team
  };

  return (
    <div>
      <div>{formatTime(time)}</div>
      {isActive && <button onClick={toggleTimer}>Pause</button>}
      {!isActive && !isNextTeamVisible && <button onClick={toggleTimer}>Play</button>}
      {isNextTeamVisible && <button onClick={handleNextTeamClick}>Next Team</button>}
    </div>
  );
};

export default Timer;
