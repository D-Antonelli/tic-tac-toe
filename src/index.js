import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.css";

/**
 * TODO
  Display the location for each move in the format (col, row) in the move history list.  [X]
  Bold the currently selected item in the move list. [X]
  Rewrite Board to use two loops to make the squares instead of hardcoding them [X].
  Add a toggle button that lets you sort the moves in either ascending or descending order [x].
  When someone wins, highlight the three squares that caused the win. [x]
  When no one wins, display a message about the result being a draw. [x]
 */

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], lines: [a, b, c] };
    }
  }
  return null;
}

function Square({ value, onClick, style }) {
  return (
    <button className="square" onClick={onClick} style={style}>
      {value}
    </button>
  );
}

function Board({ squares, onClick, styles }) {
  /* style */
  const highlightStyle = { backgroundColor: "yellow" };
  const boldStyle = { color: "red" };
  const standartStyle = { color: "black" };

  function renderSquare(i) {
    return (
      <Square
        value={squares[i]}
        onClick={() => onClick(i)}
        key={i}
        style={
          styles[i].bold === true
            ? boldStyle
            : styles[i].highlight === true
            ? highlightStyle
            : standartStyle
        }
      />
    );
  }

  const row = (start, end) => (
    <div className="board-row">
      {Array.from(Array(end - start)).map(() => renderSquare(start++))}
    </div>
  );

  return (
    <div>
      {row(0, 3)}
      {row(3, 6)}
      {row(6, 9)}
    </div>
  );
}

const defaultStyle = Array.from({ length: 9 }, () => ({
  bold: false,
  highlight: false,
}));
const defaultHistory = [
  {
    squares: Array(9).fill(null),
    move: { col: null, row: null },
  },
];
const coords = [
  { col: 1, row: 1 },
  { col: 2, row: 1 },
  { col: 3, row: 1 },
  { col: 1, row: 2 },
  { col: 2, row: 2 },
  { col: 3, row: 2 },
  { col: 1, row: 3 },
  { col: 2, row: 3 },
  { col: 3, row: 3 },
];

function Game() {
  const [history, setHistory] = useState(defaultHistory);
  const [xIsNext, setXIsNext] = useState(true);
  const [status, setStatus] = useState("Next player is X");
  const [stepNumber, setStepNumber] = useState(history.length - 1);
  const [styles, setStyles] = useState(defaultStyle);

  function handleClick(i) {
    const timeline = history.slice(0, stepNumber + 1);
    console.log(stepNumber);
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

  function setBoldTrue(step) {
    const moveIndex = coords.findIndex(
      (ele) =>
        history[step].move.col === ele.col && history[step].move.row === ele.row
    );

    if (moveIndex !== -1) {
      const copyStyle = defaultStyle.map((ele) => Object.assign({}, ele));
      copyStyle[moveIndex].bold = true;
      setStyles(copyStyle);
    }
  }

  function jumpTo(step) {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
    setBoldTrue(step);
  }

  useEffect(() => {
    (function setHightlightTrue() {
      const squares = history[history.length - 1].squares;
      let copyStyle = defaultStyle.map((ele) => Object.assign({}, ele));
      const winner = calculateWinner(squares);
      const lines = winner?.lines;
      lines?.forEach((line) => (copyStyle[line].highlight = true));
      setStyles(copyStyle);
    })();
  }, [history]);

  useEffect(() => {
    (function setCurrentStatus() {
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
    })();
  }, [history, xIsNext]);

  function onSort() {
    const timeline = [...history];
    setStepNumber(0);
    setHistory(timeline.reverse());
  }

  function reset() {
    setStepNumber(0);
    setHistory([
      {
        squares: Array(9).fill(null),
        move: { col: null, row: null },
      },
    ]);
  }

  const moves = history.map((step, move) => {
    const { col, row } = step.move;
    const desc =
      col && row
        ? "Go to move col #" + col + " row #" + row
        : "Go to game start";
    return col && row ? (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    ) : (
      <li key={move}>
        <button onClick={() => reset()}>{desc}</button>
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
        <button onClick={onSort}>Sort</button>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
