import React from "react";
import WordLetter from "../word-letter/WordLetter";
import "./WordLine.css";

function WordLine({ wordLine, resultLine }) {
  return (
    <div className="WordLine">
      {wordLine.map((wordLetter, letterIndex) => (
        <WordLetter value={wordLetter} result={resultLine[letterIndex]} />
      ))}
    </div>
  );
}

export default WordLine;
