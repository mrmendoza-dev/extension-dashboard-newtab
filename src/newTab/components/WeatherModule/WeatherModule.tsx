
import React, { useState, useEffect, useRef } from "react";
import "./index.css";

const WeatherModule = () => {
         const [weatherData, setWeatherData] = useState(null);

  function updateWeather() {
    navigator.geolocation.getCurrentPosition((position) => {
      let url = `https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial`;
      fetch(url)
        .then((res) => {
          if (!res.ok) {
            throw Error("Weather data not available");
          }
          return res.json();
        })
        .then((data) => {
          setWeatherData(data);
        })
        .catch((err) => console.error(err));
    });
  }
      useEffect(() => {
        updateWeather();
      }, []);

  return (
    <div className="WeatherModule">
      {weatherData === null ? (
        <div className="loading"></div>
      ) : (
        <>
          <img
            src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
          />
          <p className="weather-temp">{Math.round(weatherData.main.temp)}º</p>
          <p className="weather-city">{weatherData.name}</p>
        </>
      )}
    </div>
  );
};

export default WeatherModule;
