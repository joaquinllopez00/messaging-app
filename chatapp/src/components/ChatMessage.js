import "../styles/chatMessage.css";
import React, { useState } from "react";

import { MessageContext } from "./MessageContext";

import { UserHeader } from "./UserHeader";
import { MessageOptions } from "./MessageOptions";

export function ChatMessage(props) {
  const { text, uid, photoURL, context } = props.message;
  const [toggled, setToggled] = useState(false);
  const auth = props.auth;
  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";
  return (
    <div className={`message ${messageClass}`}>
      <UserHeader user={auth.currentUser} classProp={`${messageClass}`} />
      <div dangerouslySetInnerHTML={{ __html: `${text}` }}></div>
      {context ? (
        <>
          {toggled ? (
            <>
              <MessageOptions setToggled={setToggled} toggled={toggled} type={messageClass} />
              <MessageContext context={context} setToggled={setToggled} />
            </>
          ) : (
            <MessageOptions setToggled={setToggled} toggled={toggled} type={messageClass} />
          )}
        </>
      ) : (
        <MessageOptions context="false" />
      )}
    </div>
  );
}
