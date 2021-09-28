import React from "react";
import "../styles/messageOptions.css";
import { doc, deleteDoc } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

export function MessageOptions(props) {
  const { setToggled, toggled, context, type, message, firestore } = props;
  console.log(context === "false", "context !== false in mo");

  const handleDelete = async (type, content) => {
    console.log(type, content.id, firestore);
    const docRef = firestore.collection("messages").doc(content.id);
    console.log(docRef);
    const res = await docRef.delete();

    console.log(res, "response");
  };

  return (
    <div className="mo-container">
      {type === "sent" && (
        <div className="mo-options">
          <FontAwesomeIcon icon={faEdit} />
          <FontAwesomeIcon
            icon={faTrashAlt}
            onClick={() => {
              handleDelete("messages", message);
            }}
          />
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
