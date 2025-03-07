import React, { useEffect, useState } from "react";
import "./Searchbar.scss";

import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
("@fortawesome/free-solid-svg-icons");

export const icons = {
  faMagnifyingGlass,
};
const Searchbar = () => {
  const searchEngines = [
    {
      name: "Google",
      homepage: "https://www.google.com/",
      searchURL: "https://www.google.com/search?q=%s",
      imageSearchURL: "https://www.google.com/search?q=%s&tbm=isch",
      newsSearchURL: "https://www.google.com/search?q=%s&tbm=nws",
      videoSearchURL: "https://www.google.com/search?q=%s&tbm=vid",
    },
    {
      name: "Brave",
      homepage: "https://search.brave.com/",
      searchURL: "https://search.brave.com/search?q=%s",
      imageSearchURL: "https://search.brave.com/images?q=%s",
      newsSearchURL: "https://search.brave.com/news?q=%s",
      videoSearchURL: "https://search.brave.com/videos?q=%s",
    },
    {
      name: "Bing",
      homepage: "https://www.bing.com/",
      searchURL: "https://www.bing.com/search?q=%s",
      imageSearchURL: "https://www.bing.com/images/search?q=%s",
      newsSearchURL: "https://www.bing.com/news/search?q=%s",
      videoSearchURL: "https://www.bing.com/videos/search?q=%s",
    },
    {
      name: "Yahoo",
      homepage: "https://www.yahoo.com/",
      searchURL: "https://www.search.yahoo.com/search?p=%s",
      imageSearchURL: "https://images.search.yahoo.com/search/images?p=%s",
      newsSearchURL: "https://news.search.yahoo.com/search?p=%s",
      videoSearchURL: "https://video.search.yahoo.com/search/video?p=%s",
    },
    {
      name: "DuckDuckGo",
      homepage: "https://duckduckgo.com/",
      searchURL: "https://duckduckgo.com/?q=%s",
      imageSearchURL: "https://duckduckgo.com/?q=%s&iax=images&ia=images",
      newsSearchURL: "https://duckduckgo.com/?q=%s&iar=news&ia=news",
      videoSearchURL: "https://duckduckgo.com/?q=%s&iax=videos&ia=videos",
    },
    {
      name: "Baidu",
      homepage: "https://www.baidu.com/",
      searchURL: "https://www.baidu.com/s?wd=%s",
      imageSearchURL:
        "https://image.baidu.com/search/index?tn=baiduimage&word=%s",
      newsSearchURL:
        "https://www.baidu.com/s?rtt=1&bsst=1&cl=2&tn=news&word=%s",
      videoSearchURL:
        "https://www.baidu.com/sf/vsearch?pd=video&tn=vsearch&wd=%s",
    },
    {
      name: "Yandex",
      homepage: "https://www.yandex.com/",
      searchURL: "https://www.yandex.com/search/?text=%s",
      imageSearchURL: "https://yandex.com/images/search?text=%s",
      newsSearchURL: "https://news.yandex.com/yandsearch?rpt=nnews2&text=%s",
      videoSearchURL: "https://yandex.com/video/search?text=%s",
    },
    {
      name: "Ask",
      homepage: "https://www.ask.com/",
      searchURL: "https://www.ask.com/web?q=%s",
      imageSearchURL: "https://www.ask.com/images?q=%s",
      newsSearchURL: "https://www.ask.com/news?q=%s",
      videoSearchURL: "https://www.ask.com/videos?q=%s",
    },
    {
      name: "Aol",
      homepage: "https://www.aol.com/",
      searchURL: "https://search.aol.com/aol/search?q=%s",
      imageSearchURL: "https://www.search.aol.com/aol/image?q=%s",
      newsSearchURL: "https://search.aol.com/aol/news?q=%s",
      videoSearchURL: "https://search.aol.com/aol/video?q=%s",
    },
    // {
    //   name: "WolframAlpha",
    //   homepage: "https://www.wolframalpha.com/",
    //   searchURL: "https://www.wolframalpha.com/input/?i=%s",
    //   imageSearchURL: "https://www.wolframalpha.com/input/?i=%s&t=image",
    // },
  ];

  const [searchEngine, setSearchEngine] = useState(loadEngine);
  const [searchMode, setSearchMode] = useState(loadMode);
  const [inputValue, setInputValue] = useState("");

  function loadEngine() {
    const defaultOption = searchEngines[0];
    const storedOption = localStorage.getItem("engine");
    const initialOption = storedOption
      ? JSON.parse(storedOption)
      : defaultOption;
    return initialOption;
  }
  function loadMode() {
    const defaultOption = "search";
    const storedOption = localStorage.getItem("mode");
    const initialOption = storedOption
      ? JSON.parse(storedOption)
      : defaultOption;
    return initialOption;
  }

  const handleChange = (e: any) => {
    if (e.target.name === "option") {
      const selectedName = e.target.value;
      const selectedEngine: any = searchEngines.find(
        (engine) => engine.name === selectedName
      );
      setSearchEngine(selectedEngine);
    } else {
      setInputValue(e.target.value);
    }
  };

  const changeEngine = (e: any) => {
    const selectedName = e.target.value;
    const selectedEngine: any = searchEngines.find(
      (engine) => engine.name === selectedName
    );
    setSearchEngine(selectedEngine);
  };

  const changeSearchMode = (e: any) => {
    const selectedMode = e.target.value;
    setSearchMode(selectedMode);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (inputValue) {
      let engine: any = searchEngines.find(
        (item: any) => item.name === searchEngine.name
      );

      let searchUrl = ``;

      if (searchMode === "search") {
        searchUrl = engine.searchURL.replace("%s", inputValue);
      } else if (searchMode === "image") {
        searchUrl = engine.imageSearchURL.replace("%s", inputValue);
      } else if (searchMode === "video") {
        searchUrl = engine.videoSearchURL.replace("%s", inputValue);
      } else if (searchMode === "news") {
        searchUrl = engine.newsSearchURL.replace("%s", inputValue);
      }

      window.location.href = searchUrl;
    }
  };

  useEffect(() => {
    const storedEngine = localStorage.getItem("engine");
    if (storedEngine) {
      setSearchEngine(JSON.parse(storedEngine));
    } else {
      setSearchEngine(searchEngines[0]);
    }
    const storedMode = localStorage.getItem("mode");
    if (storedMode) {
      setSearchMode(JSON.parse(storedMode));
    } else {
      setSearchMode("search");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("engine", JSON.stringify(searchEngine));
  }, [searchEngine]);
  useEffect(() => {
    localStorage.setItem("mode", JSON.stringify(searchMode));
  }, [searchMode]);

  return (
    <div className="Searchbar">
      <form onSubmit={handleSubmit}>
        <select
          name="option"
          value={searchEngine.name}
          onChange={changeEngine}
          className="select-engine"
        >
          {searchEngines.map((engine) => (
            <option key={engine.name} value={engine.name}>
              {engine.name}
            </option>
          ))}
        </select>

        <select
          name="type"
          value={searchMode}
          onChange={changeSearchMode}
          className="select-mode"
        >
          <option value="search">Search</option>
          <option value="image">Image</option>
          <option value="video">Video</option>
          <option value="news">News</option>
        </select>

        <input type="text" value={inputValue} onChange={handleChange} />
        <button onClick={handleSubmit}>
          <FontAwesomeIcon
            title="Search"
            icon={icons.faMagnifyingGlass}
            className="icon"
          />
        </button>
      </form>
    </div>
  );
};

export default Searchbar;
