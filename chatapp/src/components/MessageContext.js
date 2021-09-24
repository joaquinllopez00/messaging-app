import React, { useState } from "react";
import "../styles/messageContext.css";

export function MessageContext(props) {
  const { context, toggled } = props;
  const [option, setOption] = useState("");
  return (
    <div className="mc-container">
      <div className="mc-indicator"></div>
      <div className="mc-content">
        <div className="mc-header-options">
          {Object.keys(context).map((c) => {
            return (
              <button onClick={() => setOption(c)} className={option === c && "btn-toggled"}>
                {c === "wiki" ? "Wikipedia" : "Video"}
              </button>
            );
          })}
        </div>
        {context[option] && (
          <div className="mc-info">
            <div className={`${option}`}>
              {option === "wiki" ? (
                <>
                  <p>{context[option]}</p>
                  <a href={`www.google.com`}>Link</a>
                </>
              ) : (
                <div>
                  <p>{context.vid.snippet.title}</p>
                  <p>{context.vid.snippet.description}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
