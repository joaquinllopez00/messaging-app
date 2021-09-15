import React, { useEffect, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faWindowClose, faHashtag } from "@fortawesome/free-solid-svg-icons";

import "../styles/groups.css";

export function Groups(props) {
  const groupsRef = props.firestore.collection("groups");
  const [groups] = useCollectionData(groupsRef, { idField: "id" });
  const [toggled, setToggled] = useState(true);
  const [urlPath, setUrlPath] = useState(window.location.pathname);
  const [width, changeWidth] = useState(window.innerWidth);
  const [desktop, setDesktop] = useState(true);
  const detectChange = (width, changeWidth) => {
    if (window.innerWidth > 868) {
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
        <div className="groups">
          {desktop === false && (
            <FontAwesomeIcon
              icon={faArrowUp}
              className={toggled ? "arrow-right" : "arrow-left"}
              onClick={() => setToggled(!toggled)}
            />
          )}

          <h1>Info</h1>
          <div className="info-tag">
            <FontAwesomeIcon icon={faHashtag} onClick={() => setToggled(!toggled)} />
            <p>'S</p>
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
