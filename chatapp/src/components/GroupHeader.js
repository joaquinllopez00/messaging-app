import React, { useState, useEffect } from "react";
import "../styles/groupHeader.css";

export function GroupHeader(props) {
  const [headerToggled, setHeaderToggled] = useState(false);

  const monitorScroll = () => {
    console.log(window.scrollY, headerToggled);
    if (window.scrollY > 80 && headerToggled === false) {
      console.log("setting true");
      return setHeaderToggled(!headerToggled);
    } else if (window.scrollY < 80 && headerToggled) {
      console.log("setting falase");
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
    <header className={`group-header ${headerToggled ? "group-toggled" : ""}`}>
      <h3>{props.title}</h3>
      {headerToggled === false && <p>Just a place where people go to hangout</p>}
    </header>
  );
}
