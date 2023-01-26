import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./dash.css";
import { Link } from "react-router-dom";


let words = ["neon", "cyber", "blue", "acid"];

function roll(min, max, floatFlag) {
  let r = Math.random() * (max - min) + min;
  return floatFlag ? r : Math.floor(r);
}

function randomItem(array) {
  return array[roll(0, array.length, 0)];
}



function Dashboard() {

  let url1 =
    "https://images.unsplash.com/photo-1560008511-11c63416e52d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI4NDIxMTc&ixlib=rb-1.2.1&q=80&w=1080";
  let url2 =
    "https://images.unsplash.com/photo-1519608487953-e999c86e7455?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80";

     const [weatherData, setWeatherData] = useState(null);
     const [cryptoData, setCryptoData] = useState(null);
     const [author, setAuthor] = useState(null);
     const [bgImageUrl, setBgImageUrl] = useState(url2);

    useEffect(()=> {
        updateWeather();

    updateCrypto();
    updateBackground();
  }, [])

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

  function updateCrypto() {
    let cryptos = ["bitcoin", "ethereum", "cardano"];
    let url = `https://api.coingecko.com/api/v3/coins/${randomItem(cryptos)}`;
    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw Error("Something went wrong");
        }
        return res.json();
      })
      .then((data) => {
        setCryptoData(data);
      })
      .catch((err) => console.error(err));
  }

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


  return (
    <div
      className="Dashboard"
      style={{ backgroundImage: `url(${bgImageUrl})` }}
    >
      <div className="top">
        <div className="crypto">
          {cryptoData === null ? (
            <div className="loading">
            </div>
          ) : (
            <>
              <a
                href={`https://www.coingecko.com/en/coins/${cryptoData.id}`}
                target="_blank"
              >
                <img src={cryptoData.image.small} />
                <p className="crypto-name">{cryptoData.name}</p>
              </a>
              <div>
                <p>
                  Current Price: ${cryptoData.market_data.current_price.usd}
                </p>
                <p>24h High: ${cryptoData.market_data.high_24h.usd}</p>
                <p>24h Low: ${cryptoData.market_data.low_24h.usd}</p>
              </div>
            </>
          )}
        </div>

        <div className="weather">
          {weatherData === null ? (
            <div className="loading">
            </div>
          ) : (
            <>
              <img
                src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
              />
              <p className="weather-temp">
                {Math.round(weatherData.main.temp)}º
              </p>
              <p className="weather-city">{weatherData.name}</p>
            </>
          )}
        </div>

        {/* <p className="">
          <a href="${data.user.portfolio_url}" target="_blank">
            By: {author.user.name}
          </a>
        </p> */}
      </div>

      <div className="time-display">
        <Timer className="time"></Timer>
      </div>
    </div>
  );
}

export default Dashboard;





function Timer(props: any) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
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


  return (
    <div className={props.className}>
      <p>
        {time.toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        })}
      </p>
      <p>{time.toLocaleString("en-US", { weekday: "long" })}</p>
      <p>
        {time.toLocaleString("en-US", { month: "long" })}
        {time.toLocaleString("en-US", { day: "numeric" })}
      </p>


    </div>
  );
}


  