import React, { useState, useEffect } from "react";

const AnalogClock = () => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDate(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const secondsDegrees = (date.getSeconds() / 60) * 360 + 90;
  const minutesDegrees =
    (date.getMinutes() / 60) * 360 + (date.getSeconds() / 60) * 6 + 90;
  const hoursDegrees =
    (date.getHours() / 12) * 360 + (date.getMinutes() / 60) * 30 + 90;

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div
        style={{
          position: "relative",
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          borderStyle: "solid",
          borderColor: "black",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: `rotate(${secondsDegrees}deg)`,
            transformOrigin: "0% 0%",
            width: "2px",
            height: "140px",
            backgroundColor: "red",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: `rotate(${minutesDegrees}deg)`,
            transformOrigin: "0% 0%",
            width: "4px",
            height: "120px",
            backgroundColor: "black",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: `rotate(${hoursDegrees}deg)`,
            transformOrigin: "0% 0%",
            width: "6px",
            height: "100px",
            backgroundColor: "black",
          }}
        />
      </div>
    </div>
  );
};

export default AnalogClock;
