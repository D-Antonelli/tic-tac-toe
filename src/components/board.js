import Square from "./square";

export default function Board({ squares, onClick, styles }) {
  function renderSquare(i) {
    return (
      <Square
        value={squares[i]}
        onClick={() => onClick(i)}
        key={i.toString()}
        style={styles[i]}
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
