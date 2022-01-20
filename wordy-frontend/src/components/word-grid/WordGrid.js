import React, { useEffect, useRef, useState } from "react";
import { constants } from "../../constants/Constants";
import WordLine from "../word-line/WordLine";
import "./WordGrid.css";

function WordGrid({}) {
  const [wordGrid, setWordGrid] = useState([]);
  const attemptIndexRef = useRef(0);

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
      } else if (
        keyCode === 13 &&
        attemptIndexRef.current + 1 < constants.ATTEMPT_LIMIT
      ) {
        attemptIndexRef.current = attemptIndexRef.current + 1;
      }
      // TODO: add backspace functionality, keyCode === 8
    };

    window.addEventListener("keydown", onKeyDown, true);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const renderWordLines = () => {
    return wordGrid.map((wordLine) => {
      return <WordLine wordLine={wordLine} />;
    });
  };

  return <div className="WordGrid">{renderWordLines()}</div>;
}

export default WordGrid;
