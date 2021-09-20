import React, { useState, useEffect, useContext } from "react";
import { ModeContext } from "../App";
import "../styles/groupHeader.css";

export function GroupHeader(props) {
  const [headerToggled, setHeaderToggled] = useState(false);
  const { darkMode, darkModeStyles } = useContext(ModeContext);
  const monitorScroll = () => {
    if (window.scrollY > 150 && headerToggled === false) {
      return setHeaderToggled(!headerToggled);
    } else if (window.scrollY < 90 && headerToggled) {
      return setHeaderToggled(!headerToggled);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", monitorScroll);

    return () => {
      window.removeEventListener("scroll", monitorScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [headerToggled]);

  return (
    <header
      style={{ backgroundColor: darkMode && darkModeStyles.chatColor }}
      className={`group-header ${headerToggled ? "group-toggled" : ""}`}
    >
      <h2>
        {headerToggled && "#"}
        {props.title}
      </h2>
      {headerToggled === false && <p>Just a place where people go to hangout</p>}
    </header>
  );
}
