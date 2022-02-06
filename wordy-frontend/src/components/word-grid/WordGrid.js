import React, { useEffect, useRef, useState } from "react";
import { constants } from "../../constants/Constants";
import WordLine from "../word-line/WordLine";
import { get } from "../../utils/utils";
import "./WordGrid.css";

function WordGrid({}) {
  const [wordGrid, setWordGrid] = useState([]);
  const [resultGrid, setResultGrid] = useState(
    new Array(6).fill(new Array(5).fill(null))
  );
  const attemptIndexRef = useRef(0);

  const compareWord = async () => {
    const userAttempt = wordGrid[attemptIndexRef.current].join("");
    const url = "http://localhost:5001/wordy-338816/us-central1/compareWord";

    const res = await get(url, { userAttempt });
    const tempResultGrid = [...resultGrid];
    tempResultGrid[attemptIndexRef.current] = res.resultArray;

    setResultGrid(tempResultGrid);

    return Promise.resolve();
  };

  useEffect(() => {
    const emptyWordGrid = new Array(6).fill(new Array(5).fill(""));
    setWordGrid(emptyWordGrid);

    const onKeyDown = (e) => {
      const { keyCode } = e;

      if (keyCode >= 65 && keyCode <= 90) {
        setWordGrid((prevWordGrid) => {
          const currentLine = prevWordGrid[attemptIndexRef.current];
          if (e.key && currentLine.filter((letter) => !!letter).length < 5) {
            const firstEmptySlot = currentLine.findIndex((letter) => !letter);
            const newGuessArray = [...currentLine];
            newGuessArray[firstEmptySlot] = e.key;

            const tempWordGrid = [...prevWordGrid];
            tempWordGrid[attemptIndexRef.current] = newGuessArray;
            return tempWordGrid;
          } else {
            return prevWordGrid;
          }
        });
      }
    };

    window.addEventListener("keydown", onKeyDown, true);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const renderWordLines = () => {
    return wordGrid.map((wordLine, wordIndex) => {
      return (
        <WordLine wordLine={wordLine} resultLine={resultGrid[wordIndex]} />
      );
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await compareWord();
    if (attemptIndexRef.current + 1 < constants.ATTEMPT_LIMIT) {
      attemptIndexRef.current = attemptIndexRef.current + 1;
    }
  };

  return (
    <div className="WordGrid">
      <form onSubmit={onSubmit}>
        {renderWordLines()}
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}

export default WordGrid;
