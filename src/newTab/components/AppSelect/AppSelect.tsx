import React from "react";
import "./AppSelect.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icons } from "../../../assets/icons";

function AppSelect(props: any) {
  return (
    <div className="AppSelect">
      <div className="app-list">
        <FontAwesomeIcon
          title="Calculator"
          icon={icons.faCalculator}
          className="app-icon"
        />
        <FontAwesomeIcon
          title="Dictionary"
          icon={icons.faBook}
          className="app-icon"
        />
        <FontAwesomeIcon
          title="Timer"
          icon={icons.faStopwatch}
          className="app-icon"
        />
        <FontAwesomeIcon
          title="Calendar"
          icon={icons.faCalendar}
          className="app-icon"
        />
      </div>
    </div>
  );
}

export default AppSelect;
