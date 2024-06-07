import React, { useState, useEffect } from 'react';

interface TimerProps {
  minutesPerItem: number;
}

const Timer: React.FC<TimerProps> = ({ minutesPerItem }) => {
  const [timeLeft, setTimeLeft] = useState(minutesPerItem * 60); // Convert minutes to seconds
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
    }

    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handlePlay = () => {
    setIsRunning(true);
  };

  return (
    <div>
      <h2>Timer</h2>
      <div>
        <span>{formatTime(timeLeft)}</span>
      </div>
      <button onClick={handlePause} disabled={!isRunning}>Pause</button>
      <button onClick={handlePlay} disabled={isRunning}>Play</button>
    </div>
  );
};

export default Timer;
