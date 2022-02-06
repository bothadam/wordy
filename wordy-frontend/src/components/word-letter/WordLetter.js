import React from "react";
import "./WordLetter.css";

function WordLetter({ value, result }) {
  const resultClassName = result === true ? "correct" : "incorrect";
  return (
    <div className={`WordLetter ${result === null ? "" : resultClassName}`}>
      {value}
    </div>
  );
}

export default WordLetter;
