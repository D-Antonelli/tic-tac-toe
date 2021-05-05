import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "./index.css";

/**
 * TODO
  Display the location for each move in the format (col, row) in the move history list.  [X]
  Bold the currently selected item in the move list. [X]
  Rewrite Board to use two loops to make the squares instead of hardcoding them.
  Add a toggle button that lets you sort the moves in either ascending or descending order.
  When someone wins, highlight the three squares that caused the win.
  When no one wins, display a message about the result being a draw.
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
      return squares[a];
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

function Board({ squares, onClick, highlight }) {
  function renderSquare(i) {
    return (
      <Square
        value={squares[i]}
        style={i === highlight ? { color: "red" } : { color: "black" }}
        onClick={() => onClick(i)}
      />
    );
  }

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
}

function Game() {
  const [history, setHistory] = useState([
    {
      squares: Array(9).fill(null),
      move: { col: null, row: null },
    },
  ]);

  const [xIsNext, setXIsNext] = useState(true);
  const [status, setStatus] = useState("Next player is X");
  const [stepNumber, setStepNumber] = useState(history.length - 1);
  const [highlight, setHightlight] = useState(null);
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
    setHightlight(null);
  }

  function jumpTo(step) {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
    const index = coords.findIndex(
      (ele) =>
        history[step].move.col === ele.col && history[step].move.row === ele.row
    );
    setHightlight(index);
  }

  const moves = history.map((step, move) => {
    const desc = move
      ? "Go to move col #" + step.move.col + " row #" + step.move.row
      : "Go to game start";
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  useEffect(() => {
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    const winner = calculateWinner(squares);
    let currStatus;
    if (winner) {
      currStatus = "Winner: " + winner;
    } else {
      currStatus = "Next player: " + (xIsNext ? "X" : "O");
    }
    setStatus(currStatus);
  }, [history, xIsNext]);

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={history[stepNumber].squares}
          onClick={(i) => handleClick(i)}
          highlight={highlight}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
