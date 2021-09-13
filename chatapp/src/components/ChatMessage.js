import "../styles/chatMessage.css";

import { UserHeader } from "./UserHeader";

export function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;
  const auth = props.auth;
  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";

  return (
    <div className={`message ${messageClass}`}>
      <UserHeader user={auth.currentUser} classProp={`${messageClass}`} />
      <p>{text}</p>
    </div>
  );
}
