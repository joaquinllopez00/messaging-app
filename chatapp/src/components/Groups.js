import React, { useEffect, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import "../styles/groups.css";

export function Groups(props) {
  const groupsRef = props.firestore.collection("groups");
  const [groups] = useCollectionData(groupsRef, { idField: "id" });
  console.log(groups);
  return (
    <div className="groups">
      <h1>GROUPS</h1>
      {groups &&
        groups.map((group) => {
          return (
            <a className="group-title" href="/general">
              <p>#{group.title}</p>
            </a>
          );
        })}
    </div>
  );
}
