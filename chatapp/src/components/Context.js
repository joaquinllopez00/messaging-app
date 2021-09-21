import { faAngleDoubleDown, faAngleDoubleUp, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import { SearchContext } from "../context/SearchContext";
import { searchForContext, extractContent } from "../hooks";
import "../styles/context.css";
import { Results } from "./Results";

export function Context() {
  const [toggled, setToggled] = useState(false);
  const [textIn, setTextIn] = useState("");
  const [searched, setSearched] = useState(false);
  const [tempContext, setTempContext] = useState(null);
  const { context, setContext } = useContext(SearchContext);

  const handleSearch = async () => {
    const data = await searchForContext(textIn, searched, setSearched);
    console.log(data);
    setContext(data);
    setTempContext(data);
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
                return <p>{c}</p>;
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
