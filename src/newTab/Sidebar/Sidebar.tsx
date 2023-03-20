import React, { useEffect, useState } from "react";
import Draggable from "react-draggable";
import "./index.scss";

// { url: "", name: "ChatGPT" },

let links = [
  {
    url: "https://app.netlify.com/teams/mrmendoza171/overview",
    name: "Netlify",
    category: "Cloud",
    image: "https://skillicons.dev/icons?i=netlify&theme=dark",
  },
  {
    url: "https://twitter.com/home",
    name: "Twitter",
    category: "Social",
    image: "https://skillicons.dev/icons?i=twitter&theme=dark",
  },
  {
    url: "https://signin.aws.amazon.com/signin?redirect_uri=https%3A%2F%2Fs3.console.aws.amazon.com%2Fs3%2Fbuckets%3Fregion%3Dus-west-2%26state%3DhashArgs%2523%26isauthcode%3Dtrue&client_id=arn%3Aaws%3Aiam%3A%3A015428540659%3Auser%2Fs3&forceMobileApp=0&code_challenge=gyhIPtIpITucXk794DCBdjuw3gqVPtxX0Aby0TGEoRI&code_challenge_method=SHA-256",
    name: "Amazon S3",
    category: "Cloud",
    image: "https://skillicons.dev/icons?i=aws&theme=dark",
  },
  {
    url: "https://www.linkedin.com/in/mrmendoza171/",
    name: "LinkedIn",
    category: "Career",
    image: "https://skillicons.dev/icons?i=linkedin&theme=dark",
  },
  {
    url: "https://github.com/mrmendoza171",
    name: "GitHub",
    category: "Coding",
    image: "https://skillicons.dev/icons?i=github&theme=dark",
  },
  {
    url: "https://id.heroku.com/login",
    name: "Heroku",
    category: "Cloud",
    image: "https://skillicons.dev/icons?i=heroku&theme=dark",
  },

  {
    url: "https://stevenmendoza.me/",
    name: "Personal Site",
    category: "Personal",
  },

  { url: "https://chat.openai.com/chat", name: "ChatGPT", category: "AI/ML" },
  { url: "https://labs.openai.com/", name: "DALL-E", category: "AI/ML" },

  {
    url: "https://docs.google.com/document/d/1BehfCFMKB8JdHX4HxSRth9UzdfiZqxz2ErI6RsiJoRM/edit",
    name: "2023",
    category: "Notes",
  },
  {
    url: "https://fontawesome.com/",
    name: "FontAwesome",
    category: "UI/UX",
  },
  {
    url: "https://analytics.google.com/analytics/",
    name: "Google Analytics",
    category: "Cloud",
  },
  {
    url: "https://www.midjourney.com/app/",
    name: "Midjourney",
    category: "AI/ML",
  },
  {
    url: "https://docs.google.com/spreadsheets/d/1jCt0tPnJ-mO0UfLvpEO8FjjcpjOvJiEgXUnflvyAxZI/edit#gid=0",
    name: "Music List",
    category: "Notes",
  },
  {
    url: "https://docs.google.com/spreadsheets/d/1KGWj0qBFWGUTXGfjNYr1W7nZ5U45DUGAQcrmXFli5PQ/edit#gid=0",
    name: "Goal Accountability",
    category: "Notes",
  },
  {
    url: "https://docs.google.com/document/d/1nXAkzlyMHMzeuydhss09L-q9DnemFHwAB9fzqEW1X28/edit",
    name: "Cool Lyrics",
    category: "Notes",
  },
  {
    url: "https://codepen.io/",
    name: "Codepen",
    category: "Coding",
    image: "https://skillicons.dev/icons?i=codepen&theme=dark",
  },
];

let categories = [
  "Personal",
  "Social",
  "Career",
  "Coding",
  "Cloud",
  "UI/UX",
  "AI/ML",
  "Notes",
  "Other",
];

function Sidebar() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // const [position, setPosition] = useState(
  //   JSON.parse(localStorage.getItem("position") || "{ x: 0, y: 0 }")
  // );

  // useEffect(() => {
  //   if (position.y > 0) {
  //   localStorage.setItem("position", JSON.stringify(position));

  //   }
  // }, [position]);

  const [isToggled, setIsToggled] = useState(
    JSON.parse(localStorage.getItem("sidebarOpen") || "false")
  );
  const handleClick = () => {
    setIsToggled(!isToggled);
  };
  const handleHover = () => {
    if (!isToggled) {
      setIsToggled(true);
    }
  };
  const handleLeave = () => {
    setIsToggled(false);
    console.log("leave");
  };

  useEffect(() => {
    localStorage.setItem("sidebarOpen", JSON.stringify(isToggled));
  }, [isToggled]);

  return (
    <div
      className="QuickAccess"
      style={{ right: 0 }}
      onMouseLeave={handleLeave}
    >
      <Draggable
        axis="y"
        position={position}
        onStop={(e, { y }) => setPosition({ x: 0, y })}
      >
        {/* <div className="draggable-button" > */}
        <button
          className="collapse-btn"
          onClick={handleClick}
          onMouseEnter={handleHover}
          style={{ right: 0 }}
        ></button>
        {/* </div> */}
      </Draggable>

      <div
        id="my-element"
        className="Sidebar"
        style={{ width: isToggled ? "400px" : "0px" }}
      >
        <header>
          <p className="">Quick Access</p>
        </header>

        <div className="qa-link-list">
          {categories.map((category) => (
            <div className="qa-link-category" key={category}>
              <p>{category}</p>
              <ul>
                {links
                  .filter((link) => link.category === category)
                  .map((link) => (
                    <li key={link.name}>
                      {link.image ? (
                        <a className="qa-link" href={link.url} target="_blank">
                          <img src={link.image} />
                        </a>
                      ) : (
                        <a className="qa-link" href={link.url} target="_blank">
                          {link.name}
                        </a>
                      )}
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>

        <Localhost />
      </div>
    </div>
  );
}

export default Sidebar;

function Localhost() {
  const [port, setPort] = useState(localStorage.getItem("port") || "5175");

  const handlePortChange = (e) => {
    const newPort = e.target.value;
    setPort(newPort);
    localStorage.setItem("port", newPort);
  };

  const handlePortButtonClick = (newPort) => {
    setPort(newPort);
    localStorage.setItem("port", newPort);
  };

  const popularPorts = [
    { label: "Default", value: "5173" },
    { label: "3000", value: "3000" },
    { label: "4000", value: "4000" },
    { label: "5000", value: "5000" },
    { label: "5173", value: "5173" },
    { label: "8000", value: "8000" },
    { label: "8080", value: "8080" },
  ];

  return (
    <div className="Localhost">
      <div className="ports">
        <div className="port-input">
          <a href={`http://127.0.0.1:${port}`}>localhost</a>
          <label htmlFor="port-select">Port:</label>
          <input
            id="port-select"
            type="number"
            min="1"
            max="65535"
            value={port}
            onChange={handlePortChange}
          />
        </div>

        <div className="port-btns">
          {popularPorts.map((p) => (
            <button
              key={p.value}
              onClick={() => handlePortButtonClick(p.value)}
              className="btn-port"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
