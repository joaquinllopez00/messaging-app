import { useContext, useState } from "react";
import "../styles/darkMode.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { ModeContext } from "../App";

export function DarkMode() {
  const { darkMode, setDarkMode } = useContext(ModeContext);
  const [toggled, setToggled] = useState(false);

  console.log(darkMode, "darkMode");
  const handleModeSwitch = () => {
    setToggled(!toggled);
    setDarkMode(!darkMode);
  };

  return (
    <div className="dM-container" onClick={() => handleModeSwitch()}>
      <FontAwesomeIcon icon={faMoon} className="moon" />
      <FontAwesomeIcon icon={faSun} className="sun" />
      <div className={`dM-switch ${toggled && "dark-mode"}`}></div>
    </div>
  );
}
