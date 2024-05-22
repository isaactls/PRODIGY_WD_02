import React, { useState, useEffect, useRef } from "react";
import "./style/style.css";
import { FaPause, FaPlay } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";

function StopWatch() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const startStop = () => {
    setIsRunning((prevIsRunning) => !prevIsRunning);
  };

  const reset = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setTime(0);
  };

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600000).toString().padStart(2, '0');
    const minutes = Math.floor((time % 3600000) / 60000).toString().padStart(2, '0');
    const seconds = Math.floor((time % 60000) / 1000).toString().padStart(2, '0');
    const milliseconds = Math.floor((time % 1000) / 10).toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}:${milliseconds}`;
  };

  return (
    <div className="container">
      <div className="title">Stop Watch</div>
      <div className={isRunning ? "time-container-counting" : "time-container"}>
        <span className="time">{formatTime(time)}</span>
      </div>
      <div className="buttons">
        <button className="play" onClick={startStop}>
          {isRunning ? <FaPause /> : <FaPlay />}
        </button>
        <button onClick={reset}>
          <GrPowerReset />
        </button>
      </div>
    </div>
  );
}

export default StopWatch;
