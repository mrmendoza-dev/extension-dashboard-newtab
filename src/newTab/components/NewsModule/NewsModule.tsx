import React, { useState, useEffect, useRef } from "react";
import "./index.css";
import axios from "axios";


function NewsModule() {
  const [news, setNews] = useState([]);
  const API_KEY = "8sgXdeO9gduPcaYqHetySnyU80EeTSqt1kuakCrMmi8";

  useEffect(() => {
    const fetchData = async () => {

      let url = `https://api.newscatcherapi.com/v2/latest_headlines?1=8sgXdeO9gduPcaYqHetySnyU80EeTSqt1kuakCrMmi8`;
      const result = await axios.get(url, {
        headers: {
          "x-api-key": API_KEY,
          "Content-Type": "application/json",
        },
      });
      setNews(result.data.articles);
      console.log(result.data.articles);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>News Headlines</h2>
      {news.map((article, index) => (
        <div key={index}>
          <h3>{article.title}</h3>
          <p>{article.description}</p>
        </div>
      ))}
    </div>
  );
}

export default NewsModule;
