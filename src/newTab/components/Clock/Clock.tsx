import React, { useState, useEffect } from "react";
import "./index.css";

function Clock(props: any) {
  const [datetime, setDateime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDateime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const options = {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    weekday: "long",
    month: "long",
    day: "numeric",
  };

  const time = datetime.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  const day = datetime.toLocaleString("en-US", { month: "long" });
  const weekday = datetime.toLocaleString("en-US", { weekday: "long" });
  const month = datetime.toLocaleString("en-US", { day: "numeric" });

  return (
    <div className={props.className}>
      <div className="Clock">
        <p className="main">{time}</p>
        <p className="sub">
          {weekday}, {month} {day}
        </p>
      </div>
    </div>
  );
}

export default Clock;
