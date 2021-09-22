import { faAngleDoubleDown, faAngleDoubleUp, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState, useEffect } from "react";
import { SearchContext } from "../context/SearchContext";
import { searchForContext, extractContent } from "../hooks";
import "../styles/context.css";
import { Results } from "./Results";

export function Context() {
  const [toggled, setToggled] = useState(false);
  const [textIn, setTextIn] = useState("");
  const [linkKey, setLinkKey] = useState("");
  const [searched, setSearched] = useState(false);
  const [tempContext, setTempContext] = useState(null);
  const { context, setContext } = useContext(SearchContext);

  useEffect(() => {
    let savedContext = JSON.parse(window.localStorage.getItem("threads-context"));
    let savedInitContext = JSON.parse(window.localStorage.getItem("threads-initialContext"));
    if (savedInitContext) {
      setContext(savedInitContext);
      setTempContext(savedInitContext);
    }
  }, []);

  const handleSearch = async () => {
    const data = await searchForContext(textIn, searched, setSearched);
    console.log(data);
    setLinkKey(textIn.split(" ").join("_"));
    setContext(data);
    setTempContext(data);
    window.localStorage.setItem("threads-initialContext", JSON.stringify(data));
  };

  const generateToggleVal = (c) => {
    let type;
    c === "wiki" && (type = `https://en.wikipedia.com/wiki/${linkKey}`);
    c === "vid" && (type = `https://www.youtube.com/watch?v=${context.vid.id.videoId}`);
    // console.log(type, c);
    return (
      <a href={type} rel="noopener noreferrer" target="_blank">
        {c}
      </a>
    );
  };

  // .id.videoId

  // .snippet.title

  // .snippet.channelTitle

  // .snippet.description

  // .snippet.thumbnails.default

  return (
    <div className={`apply-context ${toggled && "applying-context"} ${searched && "searching-context"}`}>
      <button
        type="button"
        onClick={() => {
          setToggled(!toggled);
          context && setSearched(!searched);
        }}
        className={toggled ? "toggled-button" : "toggle-button"}
      >
        <FontAwesomeIcon icon={toggled ? faAngleDoubleDown : faAngleDoubleUp} />
        <>
          {!toggled &&
            (context ? (
              Object.keys(context).map((c) => {
                return generateToggleVal(c);
              })
            ) : (
              <p>Apply Context</p>
            ))}
        </>
      </button>

      {toggled && (
        <>
          {tempContext ? (
            <Results
              tempContext={tempContext}
              textIn={textIn}
              setTempContext={setTempContext}
              setContext={setContext}
              context={context}
              setToggled={setToggled}
              toggled={toggled}
              setSearched={setSearched}
              searched={searched}
            />
          ) : (
            <div className="context-container">
              <p className="search-header">search a noun to apply context</p>
              <div className="search">
                <input value={textIn} onChange={(e) => setTextIn(e.target.value)} placeholder="eg. Kanye West" />
                <button className="search" type="button" onClick={() => handleSearch()}>
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
