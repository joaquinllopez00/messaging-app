import "../styles/chatRoom.css";
import { useState, useRef, useContext, useEffect } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { ChatMessage } from "./ChatMessage";
import { GroupHeader } from "./GroupHeader";
import { FormOptions } from "./FormOptions";
import { lengthChecker, addMessage, editHtml, cEMoveCursorToEnd } from "../hooks";
import { faPaperPlane, faBold, faItalic } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ModeContext } from "../App";
import { Context } from "./Context";
import { SearchContext } from "../context/SearchContext";

export function ChatRoom(props) {
  const location = window.location.pathname.slice(1);
  const bottom = useRef();
  const formData = useRef();
  const bold = useRef();

  const { darkMode, darkModeStyles } = useContext(ModeContext);

  const messagesRef = props.firestore.collection("messages");
  const query = messagesRef.where("group", "==", `${window.location.pathname.slice(1)}`).limit(25);

  const [messages] = useCollectionData(query, { idField: "id" });
  const [messageInfo, setMessageInfo] = useState("");
  const [options, setOptions] = useState(true);
  const [textOption, setTextOption] = useState("");
  const [context, setContext] = useState(null);
  const value = { context, setContext };

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

    await addMessage(messagesRef, formVal, props.firebase.firestore, location, uid, photoURL, displayName, context);
    formVal.innerHTML = "";
    setTextOption("");
    bottom.current.scrollIntoView({ behavior: "smooth" });
  };

  const messageMonitor = (e) => {
    // setFormValue(formData.current.innerText);
    let messageSplit = formData.current.innerText.split(" ");
    // console.log(messageSplit);
    textOption !== "" && editHtml(fnObj, formData, messageSplit, "editing", e);
  };

  return (
    <div className="chat-room" style={{ backgroundColor: darkMode && darkModeStyles.chatColor }}>
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
      <form
        onSubmit={sendMessage}
        className={`${messageInfo}`}
        style={{ backgroundColor: darkMode && darkModeStyles.chatColor }}
      >
        <div className="form-subcontainer">
          <SearchContext.Provider value={value}>
            <Context />
          </SearchContext.Provider>
          <div type="text" ref={formData} onKeyUp={(e) => messageMonitor(e)} contentEditable></div>
        </div>
        <div className={`form-options ${options && "form-options-visible"}`}>
          <FormOptions fnObj={fnObj} formData={formData} editHtml={editHtml} bold={bold} textOption={textOption} />
        </div>
      </form>
    </div>
  );
}
