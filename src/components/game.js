import React, { useState, useEffect } from "react";
import calculateWinner from "../game-logic/calculate-winner";
import coords from "../game-logic/coordinates";
import Board from "./board";

export default function Game() {
  const [history, setHistory] = useState([
    {
      squares: Array(9).fill(null),
      move: { col: null, row: null },
    },
  ]);
  const [xIsNext, setXIsNext] = useState(true);
  const [status, setStatus] = useState("Next player is X");
  const [stepNumber, setStepNumber] = useState(history.length - 1);
  const [styles, setStyles] = useState(Array(9).fill({}));

  function handleClick(i) {
    const timeline = history.slice(0, stepNumber + 1);
    const current = timeline[timeline.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? "X" : "O";
    setHistory(timeline.concat([{ squares: squares, move: coords[i] }]));
    setStepNumber(timeline.length);
    setXIsNext(!xIsNext);
  }

  function indexTo(step) {
    return coords.findIndex(
      (ele) =>
        history[step].move.col === ele.col && history[step].move.row === ele.row
    );
  }

  function setBoldTrue(indexTo, step) {
    const index = indexTo(step);
    if (index !== -1) {
      const style = { bold: true };
      const initialStyle = Array(9).fill({});
      initialStyle[index] = style;
      setStyles(initialStyle);
    }
  }

  function jumpTo(step) {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
    setBoldTrue(indexTo, step);
  }

  useEffect(() => {
    function setHightlightTrue() {
      const current = history[history.length - 1];
      const squares = current.squares;
      const winner = calculateWinner(squares);
      const lines = winner?.lines;
      const initialStyle = Array(9).fill({});
      const style = { highlight: true };
      lines?.forEach((line) => (initialStyle[line] = style));
      setStyles(initialStyle);
    }
    setHightlightTrue();
  }, [history]);

  useEffect(() => {
    function setCurrentStatus() {
      const current = history[history.length - 1];
      const squares = current.squares.slice();
      const result = calculateWinner(squares);
      let currStatus;
      if (result?.winner) {
        currStatus = "Winner: " + result.winner;
      } else if (squares.every((ele) => ele === "X" || ele === "O")) {
        currStatus = "Draw";
      } else {
        currStatus = "Next player: " + (xIsNext ? "X" : "O");
      }
      setStatus(currStatus);
    }
    setCurrentStatus();
  }, [history, xIsNext]);

  const moves = history.map((step, move) => {
    const { col, row } = step.move;
    const desc =
      col && row ? "Go to move col #" + col + " row #" + row : "Start game";
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={history[stepNumber].squares}
          onClick={(i) => handleClick(i)}
          styles={styles}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ul>{moves}</ul>
      </div>
    </div>
  );
}
