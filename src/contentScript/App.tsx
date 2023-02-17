import "./App.css"
import React, { useState, useEffect, useRef } from "react";
import Draggable from "react-draggable";


let links = [
  {
    url: "https://app.netlify.com/teams/mrmendoza171/overview",
    name: "Netlify",
    category: "Cloud",
  },
  {
    url: "https://signin.aws.amazon.com/signin?redirect_uri=https%3A%2F%2Fs3.console.aws.amazon.com%2Fs3%2Fbuckets%3Fregion%3Dus-west-2%26state%3DhashArgs%2523%26isauthcode%3Dtrue&client_id=arn%3Aaws%3Aiam%3A%3A015428540659%3Auser%2Fs3&forceMobileApp=0&code_challenge=gyhIPtIpITucXk794DCBdjuw3gqVPtxX0Aby0TGEoRI&code_challenge_method=SHA-256",
    name: "Amazon S3",
    category: "Cloud",
  },
  {
    url: "https://www.linkedin.com/in/mrmendoza171/",
    name: "LinkedIn",
    category: "Career",
  },
  {
    url: "https://github.com/mrmendoza171",
    name: "GitHub",
    category: "Coding",
  },
  { url: "https://id.heroku.com/login", name: "Heroku", category: "Cloud" },

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
];

 let categories = ["Personal", "Social", "Career", "Coding", "Cloud", "UI/UX", "AI/ML", "Notes"];



function App() {


          const [position, setPosition] = useState({ x: 0, y: 0 });

        // const [position, setPosition] = useState(
        //   JSON.parse(localStorage.getItem("position") || "{ x: 0, y: 0 }")
        // );

            // useEffect(() => {
            //   if (position.y > 0) {
            //   localStorage.setItem("position", JSON.stringify(position));

            //   }
            // }, [position]);


console.log("test");

    const [isToggled, setIsToggled] = useState(JSON.parse(localStorage.getItem("sidebarOpen") || "false"));
    const handleClick = () => {
      setIsToggled(!isToggled);
    };
    const handleHover = () => {
      if (!isToggled) {
        setIsToggled(true);
      }
    };

      useEffect(() => {
        localStorage.setItem("sidebarOpen", JSON.stringify(isToggled));
      }, [isToggled]);




  return (
    <div className="QuickAccess" style={{ right: 0 }}>
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

      <div id="my-element" className={isToggled ? "App-big" : "App-small"}>
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
                      <a className="qa-link" href={link.url} target="_blank">
                        {link.name}
                      </a>
                    </li>
                  ))}
              </ul>
            </div>
          ))}

          {/* {links.map((item) => {
            return (
              <a className="" href={item.url} target="_blank">
                {item.name}
              </a>
            ); */}

          {/* })} */}
        </div>
      </div>
    </div>
  );
}

export default App;



