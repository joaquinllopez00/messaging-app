import "../styles/chatRoom.css";
import { useState, useRef } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { ChatMessage } from "./ChatMessage";
import { GroupHeader } from "./GroupHeader";
import { lengthChecker, addMessage, editHtml, cEMoveCursorToEnd } from "../hooks";
import { faPaperPlane, faBold, faItalic } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
    setTextOption,
    textOption,
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    let formVal = formData.current;
    // if (formValue.length === 0 || formValue.length > 360) {
    //   lengthChecker(formValue, setMessageInfo);
    //   return;
    // }
    const { uid, photoURL, displayName } = props.auth.currentUser;

    await addMessage(messagesRef, formVal, props.firebase.firestore, location, uid, photoURL, displayName);
    formVal.innerHTML = "";
    setTextOption("");
    bottom.current.scrollIntoView({ behavior: "smooth" });
  };

  const messageMonitor = (e) => {
    // setFormValue(formData.current.innerText);
    let messageSplit = formData.current.innerText.split(" ");
    let finalWrd = messageSplit[messageSplit.length - 1];
    // console.log(messageSplit);
    textOption !== "" && editHtml(fnObj, formData, messageSplit, "editing", e);
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
        <div className="form-subcontainer">
          <div type="text" ref={formData} onKeyUp={(e) => messageMonitor(e)} contentEditable></div>
        </div>
        <div className={`form-options ${options && "form-options-visible"}`}>
          <button
            onClick={(e) => {
              textOption === "bold"
                ? editHtml(fnObj, formData, formData.current.innerHTML.split(" "), "text")
                : editHtml(fnObj, formData, formData.current.innerHTML.split(" "), "bold");
            }}
            ref={bold}
            type="button"
          >
            <FontAwesomeIcon icon={faBold} />
          </button>
          <button
            onClick={(e) => {
              textOption === "italics"
                ? editHtml(fnObj, formData, formData.current.innerHTML.split(" "), "text")
                : editHtml(fnObj, formData, formData.current.innerHTML.split(" "), "italics");
            }}
            ref={bold}
            type="button"
          >
            <FontAwesomeIcon icon={faItalic} />
          </button>
          <button type="submit">
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </div>
      </form>
    </div>
  );
}
