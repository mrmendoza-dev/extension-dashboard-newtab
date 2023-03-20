import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { icons } from "../../../assets/icons";
import "./index.scss";

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

                  <p>${crypto.current_price.toLocaleString()}</p>

                  <div
                    className="crypto-price"
                    style={{
                      color:
                        crypto.market_cap_change_percentage_24h > 0
                          ? "limegreen"
                          : "red",
                    }}
                  >
                    <FontAwesomeIcon
                      title="Add"
                      icon={
                        crypto.market_cap_change_percentage_24h > 0
                          ? icons.faCaretUp
                          : icons.faCaretDown
                      }
                    />
                    <p>
                      {Math.abs(
                        crypto.market_cap_change_percentage_24h.toLocaleString(
                          undefined,
                          { minimumFractionDigits: 2, maximumFractionDigits: 2 }
                        )
                      )}
                      %
                    </p>
                  </div>
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
