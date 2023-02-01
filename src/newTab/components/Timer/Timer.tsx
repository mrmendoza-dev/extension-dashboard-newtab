import React, { useState, useEffect } from "react";
import "./index.css";

function Timer(props: any) {
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timerId, setTimerId] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (isRunning) {
      const currentTime = Date.now();
      const timerId = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 1);
      setTimerId(timerId);
    } else {
      clearInterval(timerId);
    }
  }, [isRunning, startTime, timerId]);

  const handleStart = () => {
    if (!isRunning) {
      setStartTime(Date.now());
      setIsRunning(true);
    }
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setStartTime(null);
    setElapsedTime(0);
    setIsRunning(false);
  };

  const minutes = Math.floor(elapsedTime / 60000);
  const seconds = Math.floor((elapsedTime % 60000) / 1000);
  const milliseconds = elapsedTime % 1000;

  return (
    <div className={props.className}>
      <div>
        {minutes}:{seconds}.{milliseconds}
      </div>
      <button onClick={handleStart}>Start</button>
      <button onClick={handlePause}>Pause</button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
}

export default Timer;
