import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export function Results(props) {
  let { searched, setSearched, setToggled, toggled, textIn, tempContext, setTempContext, setContext, context } = props;
  const [savedContext, setSavedContext] = useState(tempContext);
  console.log(tempContext, "tempContext", "+", tempContext.wiki);
  const handleSave = (val, key) => {
    let newVal = {
      ...context,
      [key]: val,
    };
    console.log(context, "hello", `${key}`);
    if (context[key]) {
      if (key === "wiki") {
        delete newVal.wiki;
      } else {
        delete newVal.vid;
      }
      // setSavedContext(newVal);
    }
    // setSavedContext(newVal);

    setContext(newVal);
    window.localStorage.setItem("threads-context", JSON.stringify(newVal));
  };

  const handleSubmitContext = (e) => {
    setToggled(!toggled);
    setSearched(!searched);
    localStorage.setItem("threads-context", JSON.stringify(context));
  };

  return (
    <>
      <div className="context-container expanded">
        <p>Suggested context for {textIn}</p>
        <div className="context-results-container">
          <div className={`wiki ${context["wiki"] && "chosen"}`} onClick={() => handleSave(tempContext.wiki, "wiki")}>
            <FontAwesomeIcon icon={faCheckCircle} className={`checkMark ${context["wiki"] && "checked"}`} />
            <p className="type">Wiki Snippet</p>
            <p>{tempContext.wiki}</p>
          </div>
          <div className={`video ${context["vid"] && "chosen"}`} onClick={() => handleSave(tempContext.vid, "vid")}>
            <FontAwesomeIcon icon={faCheckCircle} className={`checkMark ${context["vid"] && "checked"}`} />
            <p className="type"> Youtube Video</p>
            <div>
              <p>{tempContext.vid.snippet.title}</p>
              <p>{tempContext.vid.snippet.description}</p>
            </div>
          </div>
          <div className="decision">
            <button
              type="button"
              disabled={!Object.keys(context).length && true}
              onClick={(e) => {
                handleSubmitContext(e);
              }}
            >
              Save Context
            </button>
            <p> or </p>
            <button type="button">Create your own</button>
          </div>
        </div>
      </div>
    </>
  );
}
