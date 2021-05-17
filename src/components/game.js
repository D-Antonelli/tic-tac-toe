import React, { useState, useEffect } from "react";
import calculateWinner from "../game-logic/calculate-winner";
import coords from "../game-logic/coordinates";
import Board from "./board";
import styled from "styled-components";
import Confetti from "react-confetti";

const Header = styled.header`
  display: flex;
  margin-bottom: 5rem;
  justify-content: center;
  height: 10vh;
`;

const Title = styled.h1`
  color: #e4ff03;
  -webkit-text-stroke: 2px black;
`;

const Main = styled.main`
  margin: 0 auto;
  width: 60%;
  height: 78vh;
  display: flex;
  align-items: center;
`;

const GameBoard = styled.div`
  margin-right: 10rem;
`;

const StatusText = styled.h2`
  color: #34ff22;
  -webkit-text-stroke: 1px black;
`;

const Moves = styled.li`
  margin-bottom: 0.5rem;
  &:nth-child(1n) {
    transform: skewX(8deg) skewY(-1deg);
  }

  &:nth-child(2n) {
    transform: skewX(-8deg) skewY(2deg);
  }
`;

const JumpBtn = styled.button`
  cursor: pointer;
  transition: all 2s ease-in-out;
  &:hover {
    background: linear-gradient(10deg, #34ff22 0 50%, #e4ff03 50% 100%);
  }
`;

const Footer = styled.footer`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Credits = styled.span`
  font-size: 1.8rem;
`;

const Link = styled.button`
  color: black;
  transition: .2s ease;

  &:hover {
    color: yellow;
  }
`;

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
  const [celebrate, setCelebrate] = useState(false);

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
    const initialStyle = Array(9).fill({});
    if (index !== -1) {
      const style = { bold: true };
      initialStyle[index] = style;
    }
    setStyles(initialStyle);
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
        setCelebrate(true);
      } else if (squares.every((ele) => ele === "X" || ele === "O")) {
        currStatus = "Draw 💥";
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
      <Moves key={move}>
        <JumpBtn onClick={() => jumpTo(move)}>{desc}</JumpBtn>
      </Moves>
    );
  });

  return (
    <>
      <Header>
        <Title>Tic-Tac-Toe</Title>
      </Header>
      <Main>
        <GameBoard>
          <Board
            squares={history[stepNumber].squares}
            onClick={(i) => handleClick(i)}
            styles={styles}
          />
        </GameBoard>
        <div className="game-info" style={{ height: "100%" }}>
          <div>
            <StatusText>{status}</StatusText>
          </div>
          <ul style={{ listStyle: "none" }}>{moves}</ul>
        </div>
      </Main>
      <Footer>
        <Credits>
          Made with &#10084;&#65039; by{" "}
          <Link
            as="a"
            href="https://github.com/D-Antonelli/tic-tac-toe"
            target="_blank"
          >
            derya
          </Link>
        </Credits>
      </Footer>
      <Confetti recycle={false} run={celebrate} numberOfPieces={1000} />
    </>
  );
}
