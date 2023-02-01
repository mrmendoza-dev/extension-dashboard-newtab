


import React, { useState, useEffect, useRef } from "react";
import "./index.css";

const CryptoModule = () => {
     const [cryptoData, setCryptoData] = useState(null);


     
  function updateCrypto() {
    const API_URL = "https://api.coingecko.com/api/v3";

    
    let cryptos = ["bitcoin", "ethereum", "cardano"];
    let url = `${API_URL}/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1`;
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


        useEffect(() => {
          updateCrypto();
        }, []);
 


  return (
    <div className="CryptoModule">
      {cryptoData === null ? (
        <div className="loading"></div>
      ) : (
        <div className="crypto-list-wrapper">
          <div className="crypto-list">
            {cryptoData.map((crypto) => {
              return (
                <div className="crypto-row flex">
                  <a
                    href={`https://www.coingecko.com/en/coins/${crypto.id}`}
                    target="_blank"
                    className="flex"
                  >
                    <img className="crypto-logo" src={crypto.image} />
                    <p className="crypto-name">{crypto.name}</p>
                  </a>

                  <p>${crypto.current_price}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default CryptoModule;

