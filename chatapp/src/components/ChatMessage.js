import "../styles/chatMessage.css";

import { UserHeader } from "./UserHeader";

export function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;
  const auth = props.auth;
  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";
  console.log(props.message);
  return (
    <div className={`message ${messageClass}`}>
      <UserHeader user={auth.currentUser} classProp={`${messageClass}`} />
      <div dangerouslySetInnerHTML={{ __html: `${text}` }}></div>
    </div>
  );
}
