import "../styles/chatRoom.css";
import { useState, useRef } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { ChatMessage } from "./ChatMessage";
import { GroupHeader } from "./GroupHeader";
import { lengthChecker, addMessage, editHtml, cEMoveCursorToEnd } from "../hooks";

export function ChatRoom(props) {
  const location = window.location.pathname.slice(1);
  const bottom = useRef();
  const formData = useRef();
  const bold = useRef();

  const messagesRef = props.firestore.collection("messages");
  const query = messagesRef.where("group", "==", `${window.location.pathname.slice(1)}`).limit(25);

  const [messages] = useCollectionData(query, { idField: "id" });
  const [formValue, setFormValue] = useState("");
  const [messageInfo, setMessageInfo] = useState("");
  const [options, setOptions] = useState(true);
  const [textOption, setTextOption] = useState("");

  let fnObj = {
    setOptions,
    textOption,
    setTextOption,
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    setFormValue(formData.current.innerHTML);
    console.log(formValue, "formValue");
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
    // setFormValue(formData.current.innerText);
    let messageSplit = formData.current.innerText.split(" ");
    let finalWrd = messageSplit[messageSplit.length - 1];
    // console.log(messageSplit);
    textOption !== "" && editHtml(fnObj, formData, messageSplit, textOption, e);
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
        <div className={`form-options ${options && "form-options-visible"}`}>
          <button
            onClick={(e) => {
              textOption === "bold"
                ? editHtml(fnObj, formData, formData.current.innerHTML.split(" "), "")
                : editHtml(fnObj, formData, formData.current.innerHTML.split(" "), "bold");
            }}
            ref={bold}
            type="button"
          >
            Bold
          </button>
          <button>Italics</button>
          <button>Strong</button>
        </div>
        <div className="form-subcontainer">
          <div type="text" ref={formData} onKeyUp={(e) => messageMonitor(e)} contentEditable></div>
        </div>
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
