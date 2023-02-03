import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./newTab.css";
import { Link } from "react-router-dom";
import Searchbar from "./components/Searchbar/Searchbar";
import Clock from "./components/Clock/Clock";
import CryptoModule from "./components/CryptoModule/CryptoModule";
import WeatherModule from "./components/WeatherModule/WeatherModule";
import ToDoList from "./components/ToDoList/ToDoList";
import Sidebar from "./components/Sidebar/Sidebar";

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
    <div
      className="Dashboard"
      style={{ backgroundImage: `url(${bgImageUrl})` }}
    >
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
    </div>
  );
}

export default Dashboard;
