import React from "react";
import "../styles/messageOptions.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

export function MessageOptions(props) {
  const { setToggled, toggled, context, type } = props;
  console.log(context !== "false", type);
  return (
    <div className="mo-container">
      {type === "sent" && (
        <div className="mo-options">
          <FontAwesomeIcon icon={faEdit} />
          <FontAwesomeIcon icon={faTrashAlt} />
        </div>
      )}

      {context !== "false" && (
        <p className="" onClick={() => setToggled(!toggled)}>
          context
        </p>
      )}
    </div>
  );
}
