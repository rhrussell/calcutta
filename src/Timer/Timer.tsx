// Importing necessary parts from React
import React, { useState, useEffect, useRef } from "react";

// Defining the types for the properties that the Timer component will receive
// The TimerProps interface specifies the properties that the Timer component expects when it is used
interface TimerProps {
  minutesPerItem: number; // Number of minutes for each item
  onTimerEnd: () => void; // Function to call when the timer ends
  onTimerPause: (isPaused: boolean) => void; // Function to call when the timer is paused or resumed
  resetFlag: boolean; // Flag to reset the timer
  showNextTeamButton: boolean; // Flag to indicate if the Next Team button is shown
}

// The main Timer component
// This component displays a timer that counts down from a specified number of minutes
// It also provides buttons to pause and play the timer
// The timer can be reset using the resetFlag property
// The Timer component is a functional component that takes in props of type TimerProps
// The Timer component uses React hooks to manage state and side effects
const Timer: React.FC<TimerProps> = ({
  minutesPerItem,
  onTimerEnd,
  onTimerPause,
  resetFlag,
  showNextTeamButton,
}) => {
  // State to keep track of the remaining time (in seconds)
  const [timeLeft, setTimeLeft] = useState<number>(minutesPerItem * 60);
  // State to keep track of whether the timer is active or paused
  const [isActive, setIsActive] = useState<boolean>(false);
  // Reference to store the interval ID for the timer
  const intervalRef = useRef<number | null>(null);

  // useEffect hook that runs when timeLeft or isActive changes
  useEffect(() => {
    // If the timer is active and there is time left
    if (isActive && timeLeft > 0) {
      // Set a timeout to decrease the timeLeft by 1 second
      intervalRef.current = window.setTimeout(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      // If timeLeft is 0, call the onTimerEnd function
      onTimerEnd();
    }
    // Cleanup function to clear the timeout
    return () => {
      if (intervalRef.current !== null) {
        clearTimeout(intervalRef.current);
      }
    };
  }, [timeLeft, isActive]); // Dependencies for the effect

  // useEffect hook that runs when resetFlag or minutesPerItem changes
  useEffect(() => {
    // Reset the timeLeft and pause the timer
    setTimeLeft(minutesPerItem * 60);
    setIsActive(false);
  }, [resetFlag, minutesPerItem]); // Dependencies for the effect

  // useEffect hook that runs when isActive changes
  useEffect(() => {
    // Call the onTimerPause function with the opposite of isActive
    onTimerPause(!isActive);
  }, [isActive]); // Dependency for the effect

  // Function to handle pausing the timer
  const handlePause = () => {
    setIsActive(false);
  };

  // Function to handle playing the timer
  const handlePlay = () => {
    setIsActive(true);
  };

  // Function to format the time as minutes and seconds
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60); // Get the minutes
    const seconds = time % 60; // Get the seconds
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`; // Format the time
  };

  // Return the JSX to render the timer component
  return (
    <div>
      <h2>Timer</h2>
      <h3>{formatTime(timeLeft)}</h3>
      {!showNextTeamButton && // If the Next Team button is not shown
        (isActive ? (
          <button onClick={handlePause}>Pause</button> // Button to pause the timer
        ) : (
          <button onClick={handlePlay}>Play</button> // Button to play the timer
        ))}
    </div>
  );
};

// This exports the Timer component so it can be used in other parts of the application.
// This is a common pattern in React development.
// Other components can import and use the Timer component by importing it from this file.
// For example, in src/App.tsx, the Timer component is imported and used.
// This allows for reusability and modularity in React applications.
// This is a key feature of React that enables developers to build complex applications with ease.
// By breaking down the application into smaller, reusable components, developers can create maintainable and scalable codebases.
export default Timer;