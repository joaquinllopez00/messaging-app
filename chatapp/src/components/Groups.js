import React, { useEffect, useState, useContext } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

import "../styles/groups.css";
import { ModeContext } from "../App";

export function Groups(props) {
  const groupsRef = props.firestore.collection("groups");
  const [groups] = useCollectionData(groupsRef, { idField: "id" });
  const [toggled, setToggled] = useState(true);
  const [urlPath, setUrlPath] = useState(window.location.pathname);
  const [width] = useState(window.innerWidth);
  const [desktop, setDesktop] = useState(true);
  const { darkMode, darkModeStyles } = useContext(ModeContext);
  console.log(darkModeStyles.backgroundColor, "background color");
  const detectChange = (width, changeWidth) => {
    if (window.innerWidth > 720) {
      setToggled(true);
      setDesktop(true);
    } else {
      setDesktop(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", detectChange);
    return () => {
      window.removeEventListener("resize", detectChange);
    };
  }, [width]);

  return (
    <>
      {toggled ? (
        <div className="groups" style={{ backgroundColor: darkMode && darkModeStyles.backgroundColor }}>
          {desktop === false && (
            <FontAwesomeIcon
              icon={faArrowUp}
              className={toggled ? "arrow-right" : "arrow-left"}
              onClick={() => setToggled(!toggled)}
            />
          )}
          <div className="group-content-wrapper">
            <div className="info-tag">
              <h2>threads</h2>
            </div>
            {groups &&
              groups.map((group, id) => {
                return (
                  <a className="group-title" href={`/${group.title}`} key={id}>
                    <p>#{group.title}</p>
                  </a>
                );
              })}
          </div>
        </div>
      ) : (
        <>
          {desktop === false && (
            <FontAwesomeIcon icon={faArrowUp} className="arrow-left" onClick={() => setToggled(!toggled)} />
          )}
        </>
      )}
    </>
  );
}
