import Square from "./square";
import styled from "styled-components";

const BoardRow = styled.div`
  &:after {
  clear: both;
  content: "";
  display: table;
  }
`;

export default function Board({ squares, onClick, styles }) {
  function renderSquare(i) {
    return (
      <Square
        value={squares[i]}
        onClick={() => onClick(i)}
        key={i.toString()}
        style={styles[i]}
        position={i}
      />
    );
  }

  const row = (start, end) => (
    <BoardRow>
      {Array.from(Array(end - start)).map(() => renderSquare(start++))}
    </BoardRow>
  );

  return (
    <>
      {row(0, 3)}
      {row(3, 6)}
      {row(6, 9)}
    </>
  );
}
