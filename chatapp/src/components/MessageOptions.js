import React, { useState } from "react";
import "../styles/messageOptions.css";
import { doc, deleteDoc } from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faSave, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

export function MessageOptions(props) {
  const { setToggled, toggled, context, type, message, firestore } = props;
  const [edit, setEdit] = useState(false);
  console.log(props.firestore, "firestore in mo");
  const handleDelete = async (type, content) => {
    // console.log(type, content.id, firestore);
    console.log(firestore);
    const docRef = firestore.collection("messages").doc(content.id);
    // console.log(docRef);
    const res = await docRef.delete();

    // console.log(res, "response");
  };

  const handleEdit = async (e) => {
    let messageContainer = e.target.closest(".message").children[1];
    if (edit) {
      messageContainer.contentEditable = false;
      messageContainer.childNodes.forEach((el) => {
        el.contentEditable = false;
      });
      console.log(message);

      await editMessage(messageContainer);
    } else {
      messageContainer.contentEditable = true;
      messageContainer.childNodes.forEach((el) => {
        el.contentEditable = true;
      });
      messageContainer.focus();
    }
    setEdit(!edit);
  };

  const editMessage = async (mc) => {
    const docRef = firestore.collection("messages").doc(message.id);
    // console.log(docRef);
    console.log(mc.innerHTML);
    const res = await docRef.update({ text: mc.innerHTML });
  };

  return (
    <div className="mo-container">
      {type === "sent" && (
        <div className="mo-options">
          {edit ? (
            <FontAwesomeIcon icon={faSave} onClick={(e) => handleEdit(e)} />
          ) : (
            <FontAwesomeIcon
              icon={faEdit}
              onClick={(e) => {
                handleEdit(e);
              }}
            />
          )}

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
