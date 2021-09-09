import React, { useEffect, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";

import "../styles/groups.css";

export function Groups(props) {
  const groupsRef = props.firestore.collection("groups");
  const [groups] = useCollectionData(groupsRef, { idField: "id" });
  const [toggled, setToggled] = useState(false);
  const [urlPath, setUrlPath] = useState(window.location.pathname);
  return (
    <>
      {toggled ? (
        <div className="groups">
          <FontAwesomeIcon
            icon={faArrowUp}
            className={toggled ? "arrow-right" : "arrow-left"}
            onClick={() => setToggled(!toggled)}
          />
          <h1>GROUPS</h1>
          {groups &&
            groups.map((group) => {
              return (
                <a className="group-title" href={`/${group.title}`}>
                  <p>#{group.title}</p>
                </a>
              );
            })}
        </div>
      ) : (
        <FontAwesomeIcon icon={faArrowUp} className="arrow-left" onClick={() => setToggled(!toggled)} />
      )}
    </>
  );
}
