import React, { useContext } from "react";
import "../styles/nav.css";
import { ModeContext } from "../App";
import { DarkMode } from "./DarkMode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHashtag } from "@fortawesome/free-solid-svg-icons";

export function Nav() {
  const { darkMode, darkModeStyles } = useContext(ModeContext);
  console.log(darkMode, darkModeStyles);
  // const fieldProps = {
  //   style: darkMode && { darkModeStyles.darkMode },
  // };
  return (
    <nav style={{ backgroundColor: darkMode && darkModeStyles.backgroundColor }}>
      <div className="logo">
        <FontAwesomeIcon icon={faHashtag} className="logo-img" />
        <div className="overflow-text-logo">
          <p>threads</p>
          <div
            className="overflow-text-cover"
            style={{ backgroundColor: darkMode && darkModeStyles.backgroundColor }}
          ></div>
        </div>
      </div>
      <input type="text" placeholder="Search threads" />
      <DarkMode />
    </nav>
  );
}
