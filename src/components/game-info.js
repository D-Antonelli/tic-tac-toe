import React, { useState, useEffect } from "react";
import calculateWinner from "../game-logic/calculate-winner";
import {
  StyledGameInfo,
  Moves,
  JumpBtn,
  StatusText,
  InfoList,
  StatusWrapper,
  RestartButton,
  BtnText
} from "../style/game-info-style";

export function GameInfo({ xIsNext, history, setCelebrate, jumpTo, restart }) {
  const [status, setStatus] = useState("Next player is X");

  useEffect(() => {
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
  }, [xIsNext, history, setCelebrate]);

  const moves = history.map((step, move) => {
    const { col, row } = step.move;
    const desc =
      col && row ? "Go to move col #" + col + " row #" + row : "Restart game";
    return (
      col &&
      row && (
        <Moves key={move}>
          <JumpBtn onClick={() => jumpTo(move)}>{desc}</JumpBtn>
        </Moves>
      )
    );
  });

  return (
    <StyledGameInfo>
      <StatusWrapper>
        <RestartButton onClick={restart}><BtnText>Restart</BtnText></RestartButton>
        <StatusText>{status}</StatusText>
      </StatusWrapper>
      <InfoList>{moves}</InfoList>
    </StyledGameInfo>
  );
}
