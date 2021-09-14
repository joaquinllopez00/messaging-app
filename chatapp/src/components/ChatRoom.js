import "../styles/chatRoom.css";
import { useState, useRef } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { ChatMessage } from "./ChatMessage";
import { GroupHeader } from "./GroupHeader";
import { lengthChecker, addMessage } from "../hooks";

export function ChatRoom(props) {
  const location = window.location.pathname.slice(1);
  const bottom = useRef();

  const messagesRef = props.firestore.collection("messages");
  const query = messagesRef.where("group", "==", `${window.location.pathname.slice(1)}`).limit(25);

  const [messages] = useCollectionData(query, { idField: "id" });
  const [formValue, setFormValue] = useState("");
  const [messageInfo, setMessageInfo] = useState("");
  const [options, setOptions] = useState(false);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (formValue.length === 0 || formValue.length > 360) {
      lengthChecker(formValue, setMessageInfo);
      return;
    }
    const { uid, photoURL, displayName } = props.auth.currentUser;
    await addMessage(messagesRef, formValue, props.firebase.firestore, location, uid, photoURL, displayName);
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
      <GroupHeader title={location} />
      <main>
        <div>
          {messages &&
            messages
              .sort((el1, el2) => {
                return el1.createdAt - el2.createdAt;
              })
              .map((msg, idx) => (
                <ChatMessage auth={props.auth} key={msg.id} message={msg} style={idx === 0 ? "margin-top: 4rem" : ""} />
              ))}
        </div>
        <div id="bottom" ref={bottom}></div>
      </main>
      <form onSubmit={sendMessage} className={`${messageInfo}`}>
        <textarea type="text" value={formValue} onChange={(e) => messageMonitor(e.target)} />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
