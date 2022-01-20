import React from "react";
import WordLetter from "../word-letter/WordLetter";
import "./WordLine.css";

function WordLine({ wordLine }) {
  return (
    <div className="WordLine">
      {wordLine.map((wordLetter) => (
        <WordLetter value={wordLetter} />
      ))}
    </div>
  );
}

export default WordLine;
