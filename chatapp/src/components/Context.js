import { faAngleDoubleDown, faAngleDoubleUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { searchForContext } from "../hooks";
import "../styles/context.css";

export function Context() {
  const [toggled, setToggled] = useState(false);
  const [textIn, setTextIn] = useState("");
  return (
    <div className={`apply-context ${toggled && "applying-context"}`}>
      <button
        type="button"
        onClick={() => {
          setToggled(!toggled);
        }}
        className={toggled ? "toggled-button" : "toggle-button"}
      >
        <FontAwesomeIcon icon={toggled ? faAngleDoubleDown : faAngleDoubleUp} />
        {!toggled && "Apply Context"}
      </button>
      {toggled && (
        <div className="context-container">
          <p className="search-header">search a noun to apply context</p>
          <div className="search">
            <input value={textIn} onChange={(e) => setTextIn(e.value)} />
            <button className="search" type="button" onClick={() => searchForContext(textIn)} />
          </div>
        </div>
      )}
    </div>
  );
}
