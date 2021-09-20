import React from "react";

import "../styles/formOptions.css";

import { faPaperPlane, faBold, faItalic } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export function FormOptions(props) {
  let { fnObj, formData, editHtml, bold, textOption } = props;

  return (
    <>
      <div className="extra-options">
        <button
          onClick={(e) => {
            props.textOption === "bold"
              ? editHtml(fnObj, formData, formData.current.innerHTML.split(" "), "text")
              : editHtml(fnObj, formData, formData.current.innerHTML.split(" "), "bold");
          }}
          ref={props.bold}
          type="button"
          className="bold-option"
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
          className="italics-option"
        >
          <FontAwesomeIcon icon={faItalic} />
        </button>
        <button
          onClick={(e) => {
            props.textOption === "blue"
              ? editHtml(fnObj, formData, formData.current.innerHTML.split(" "), "text")
              : editHtml(fnObj, formData, formData.current.innerHTML.split(" "), "blue");
          }}
          ref={props.bold}
          type="button"
          className="blue-option"
        >
          B
        </button>
        <button
          onClick={(e) => {
            props.textOption === "red"
              ? editHtml(fnObj, formData, formData.current.innerHTML.split(" "), "text")
              : editHtml(fnObj, formData, formData.current.innerHTML.split(" "), "red");
          }}
          ref={props.bold}
          type="button"
          className="red-option"
        >
          R
        </button>
      </div>

      <button type="submit">
        <FontAwesomeIcon icon={faPaperPlane} />
      </button>
    </>
  );
}
