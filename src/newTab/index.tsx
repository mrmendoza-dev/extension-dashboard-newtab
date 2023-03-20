import React from "react";
import { createRoot } from "react-dom/client";
import { HashRouter as Router } from "react-router-dom";
// import "../assets/tailwind.scss";
import Dashboard from "./newTab";

function init() {
  const appContainer = document.createElement("div");
  document.body.appendChild(appContainer);
  if (!appContainer) {
    throw new Error("Can not find AppContainer");
  }
  const root = createRoot(appContainer);
  root.render(
    <Router>
      <Dashboard />
    </Router>
  );
}

init();
