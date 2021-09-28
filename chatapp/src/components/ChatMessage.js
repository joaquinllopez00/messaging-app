import "../styles/chatMessage.css";
import React, { useState } from "react";

import { MessageContext } from "./MessageContext";

import { UserHeader } from "./UserHeader";
import { MessageOptions } from "./MessageOptions";

export function ChatMessage(props) {
  const { text, uid, photoURL, context } = props.message;
  const { firestore } = props;
  const [toggled, setToggled] = useState(false);
  const auth = props.auth;
  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";
  console.log(context, "in chatmessage");
  return (
    <div className={`message ${messageClass}`}>
      <UserHeader user={auth.currentUser} classProp={`${messageClass}`} />
      <div dangerouslySetInnerHTML={{ __html: `${text}` }}></div>
      {context ? (
        <>
          {toggled ? (
            <>
              <MessageOptions setToggled={setToggled} toggled={toggled} type={messageClass} message={props.message} />
              <MessageContext context={context} setToggled={setToggled} />
            </>
          ) : (
            <MessageOptions
              setToggled={setToggled}
              toggled={toggled}
              type={messageClass}
              message={props.message}
              firestore={firestore}
            />
          )}
        </>
      ) : (
        <MessageOptions context="false" type={messageClass} />
      )}
    </div>
  );
}
