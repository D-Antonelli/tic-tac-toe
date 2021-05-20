import React, { useState, useEffect } from "react";
import calculateWinner from "../game-logic/calculate-winner";
import coords from "../game-logic/coordinates";
import Board from "./board";
import { Header, Title, Content, GameBoard } from "../style/game-style";
import Confetti from "react-confetti";
import useWindowSize from "../utilities/use-window-size";
import { GameInfo } from "./game-info";
import { Footer } from "./footer";

const initialHistory = [
  {
    squares: Array(9).fill(null),
    move: { col: null, row: null },
  },
];

export default function Game() {
  const [history, setHistory] = useState(initialHistory);
  const [xIsNext, setXIsNext] = useState(true);
  const [stepNumber, setStepNumber] = useState(history.length - 1);
  const [styles, setStyles] = useState(Array(9).fill({}));
  const [celebrate, setCelebrate] = useState(false);
  const { width, height } = useWindowSize();

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

  function jumpTo(step) {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
    setBoldTrue(indexTo, step);
  }

  function restart() {
    setStepNumber(0);
    setXIsNext(true);
    setHistory(initialHistory);
  }

  function indexTo(step) {
    return coords.findIndex(
      (ele) =>
        history[step].move.col === ele.col && history[step].move.row === ele.row
    );
  }

  function setBoldTrue(indexTo, step) {
    const index = indexTo(step);
    const initialStyle = Array(9).fill({});
    if (index !== -1) {
      const style = { bold: true };
      initialStyle[index] = style;
    }
    setStyles(initialStyle);
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

  return (
    <>
      <Header role="banner">
        <Title>Tic-Tac-Toe</Title>
      </Header>
      <Content role="main">
        <GameBoard>
          <Board
            squares={history[stepNumber].squares}
            onClick={(i) => handleClick(i)}
            styles={styles}
          />
        </GameBoard>
        <GameInfo
          xIsNext={xIsNext}
          history={history}
          setCelebrate={setCelebrate}
          jumpTo={jumpTo}
          restart={restart}
        />
      </Content>
      <Footer role="contentinfo" />
      <Confetti
        recycle={false}
        run={celebrate}
        numberOfPieces={1000}
        width={width}
        height={height}
      />
    </>
  );
}
