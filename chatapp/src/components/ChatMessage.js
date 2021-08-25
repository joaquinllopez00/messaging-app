export function ChatMessage(props) {
  const { text, uid, photoUrl } = props.message;
  const auth = props.auth;
  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";

  return (
    <div className={`message ${messageClass}`}>
      <img src={photoUrl} alt="profile" />
      <p>{text}</p>
    </div>
  );
}
