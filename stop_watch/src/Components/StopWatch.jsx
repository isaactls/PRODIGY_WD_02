import React, { useState, useEffect } from "react";
import "./style/style.css";
import { FaPause, FaPlay } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";

function StopWatch() {
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const [msecond, setMsecond] = useState(0);
  const [count, setCount] = useState(false);

  useEffect(() => {
    let intervalId;
    if (count) {
      intervalId = setInterval(() => {
        setMsecond((prevMsecond) => {
          if (prevMsecond < 999) {
            return prevMsecond + 10;
          } else {
            setSecond((prevSecond) => {
              if (prevSecond < 59) {
                return prevSecond + 1;
              } else {
                setMinute((prevMinute) => {
                  if (prevMinute < 59) {
                    return prevMinute + 1;
                  } else {
                    setHour((prevHour) => prevHour + 1);
                    return 0;
                  }
                });
                return 0;
              }
            });
            return 0;
          }
        });
      }, 10);
    } else {
      clearInterval(intervalId);
    }
    return () => clearInterval(intervalId);
  }, [count]);

  const start = () => {
    setCount((prevCount) => !prevCount);
  };

  const reset = () => {
    setCount(false);
    setHour(0);
    setMinute(0);
    setSecond(0);
    setMsecond(0);
  };

  return (
    <div className="container">
      <div className="title">Stop Watch</div>
      <div className={count ? "time-container-counting" : "time-container"}>
        <span className="hour">{hour < 10 ? `0${hour}` : hour}</span> :{" "}
        <span className="minute">{minute < 10 ? `0${minute}` : minute}</span> :{" "}
        <span className="second">{second < 10 ? `0${second}` : second}</span> :{" "}
        <span className="msecond">
          {msecond < 100 ? `0${msecond}` : msecond}
        </span>
      </div>
      <div className="buttons">
        <button className="play" onClick={start}>
          {count ? <FaPause /> : <FaPlay />}
        </button>
        <button onClick={reset}>
          <GrPowerReset />
        </button>
      </div>
    </div>
  );
}

export default StopWatch;
