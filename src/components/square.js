import { Tile, Move } from "../style/square-style";

export default function Square({ value, onClick, style, position }) {
  console.log(value);
  return (
    <Tile onClick={onClick} position={position} style={style}>
      <Move value={value} style={style}>
        {value}
      </Move>
    </Tile>
  );
}
