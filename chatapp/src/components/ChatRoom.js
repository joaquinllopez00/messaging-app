import "../styles/chatRoom.css";
import { useState, useRef } from "react";
import { useLocation } from "react-dom";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { ChatMessage } from "./ChatMessage";

export function ChatRoom(props) {
  const location = window.location.pathname.slice(1);
  const bottom = useRef();

  const messagesRef = props.firestore.collection("messages");

  const query = messagesRef.where("group", "==", "general").limit(25);

  const [messages] = useCollectionData(query, { idField: "id" });
  console.log(messages);
  const [formValue, setFormValue] = useState("");
  const [options, setOptions] = useState(false);

  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = props.auth.currentUser;
    await messagesRef.add({
      text: formValue,
      createdAt: props.firebase.firestore.FieldValue.serverTimestamp(),
      group: location,
      uid,
      photoURL,
    });
    setFormValue("");
    bottom.current.scrollIntoView({ behavior: "smooth" });
  };

  const messageMonitor = (e) => {
    setFormValue(e.value);
    let messageSplit = e.value.split(" ");
    let finalChar = messageSplit[messageSplit.length - 1];

    if (finalChar === "/") {
      setOptions(true);
    }
  };

  return (
    <div className="chat-room">
      <main>
        <div>
          {messages &&
            messages
              .sort((el1, el2) => {
                return el1.createdAt - el2.createdAt;
              })
              .map((msg) => <ChatMessage auth={props.auth} key={msg.id} message={msg} />)}
        </div>
        <div ref={bottom}></div>
      </main>
      <form onSubmit={sendMessage}>
        <input type="text" value={formValue} onChange={(e) => messageMonitor(e.target)} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
