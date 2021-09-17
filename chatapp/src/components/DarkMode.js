import { useState } from "react";
import "../styles/darkMode.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

export function DarkMode() {
  const [toggled, setToggled] = useState(false);

  return (
    <div className="dM-container" onClick={() => setToggled(!toggled)}>
      <FontAwesomeIcon icon={faSun} className="sun" />
      <FontAwesomeIcon icon={faMoon} className="moon" />
      <div className={`dM-switch ${toggled && "dark-mode"}`}></div>
    </div>
  );
}
