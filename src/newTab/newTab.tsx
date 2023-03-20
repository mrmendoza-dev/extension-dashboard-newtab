import React, { useEffect, useRef, useState } from "react";
import Searchbar from "./components/Searchbar/Searchbar";
import Sidebar from "./Sidebar/Sidebar";
import Clock from "./components/Clock/Clock";
import CryptoModule from "./components/CryptoModule/CryptoModule";
import Notes from "./components/Notes/Notes";
import ToDoList from "./components/ToDoList/ToDoList";
import WeatherModule from "./components/WeatherModule/WeatherModule";
import AppSelect from "./components/AppSelect/AppSelect";

import "./newTab.scss";
// import AnalogClock from "./components/AnalogClock/AnalogClock";

let words = ["neon", "cyber", "blue", "acid"];

function roll(min, max, floatFlag) {
  let r = Math.random() * (max - min) + min;
  return floatFlag ? r : Math.floor(r);
}

function randomItem(array) {
  return array[roll(0, array.length, 0)];
}

// https://fonts.google.com/about
// https://animista.net/

function Dashboard() {
  let url1 =
    "https://images.unsplash.com/photo-1560008511-11c63416e52d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI4NDIxMTc&ixlib=rb-1.2.1&q=80&w=1080";
  let url2 =
    "https://images.unsplash.com/photo-1519608487953-e999c86e7455?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80";
  const [author, setAuthor] = useState(null);
  const [bgImageUrl, setBgImageUrl] = useState(url2);

  useEffect(() => {
    updateBackground();
  }, []);

  function updateBackground() {
    let url = `https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=${randomItem(
      words
    )}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        // setBgImageUrl(data.urls.regular);
        setAuthor(data);
      })
      .catch((err) => console.error(err));
  }

  return (
    <div className="Dashboard">
      <div
        className="bg"
        style={{ backgroundImage: `url(${bgImageUrl})` }}
      ></div>

      <Sidebar></Sidebar>
      <div className="crypto-module module-frame">
        <CryptoModule />
      </div>

      <div className="weather-module module-frame">
        <WeatherModule />
      </div>

      {/* <p className="">
          <a href="${data.user.portfolio_url}" target="_blank">
            By: {author.user.name}
          </a>
        </p> */}

      <div className="center-frame">
        <Clock className="clock-module module-frame" />
        <Searchbar />
      </div>
      {/* <Timer className="timer-module module-frame"></Timer> */}

      <div className="todo-module module-frame">
        <ToDoList />
      </div>

      {/* <div className="news-module module-frame">
        <NewsModule />
      </div> */}

      <div className="notes-module module-frame">
        <Notes />
      </div>
      <div className="app-select-module module-frame">
        <AppSelect />
      </div>
    </div>
  );
}

export default Dashboard;

function ToggleButton(props: any) {
  const [isToggled, setToggled] = useState(false);
  function handleClick() {
    setToggled(!isToggled);
    props.setValue(!isToggled);
  }

  return (
    <button
      onClick={handleClick}
      style={{ backgroundColor: isToggled ? "green" : "red" }}
    >
      {isToggled ? "ON" : "OFF"}
    </button>
  );
}

function EditableText(props: any) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(props.text);
  const inputRef: any = useRef(null);

  useEffect(() => {
    if (isEditing) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  function startEditing() {
    setIsEditing(true);
  }

  function stopEditing() {
    setIsEditing(false);
  }

  function handleChange(event: any) {
    setText(event.target.value);
    props.setValue(event.target.value);
  }

  if (isEditing) {
    return (
      <div className={props.className}>
        <input
          type="text"
          ref={inputRef}
          value={text}
          onChange={handleChange}
          onBlur={stopEditing}
        />
      </div>
    );
  } else {
    return <span onClick={startEditing}>{text}</span>;
  }
}
