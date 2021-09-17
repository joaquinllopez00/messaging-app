import React from "react";
import "../styles/nav.css";

import { DarkMode } from "./DarkMode";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHashtag } from "@fortawesome/free-solid-svg-icons";

export function Nav() {
  return (
    <nav>
      <div className="logo">
        <FontAwesomeIcon icon={faHashtag} className="logo-img" />
        <div className="overflow-text-logo">
          <p>threads</p>
          <div className="overflow-text-cover"></div>
        </div>
      </div>
      <input type="text" placeholder="Search threads" />
      <DarkMode />
    </nav>
  );
}
