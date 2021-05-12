export default function Square({ value, onClick, style }) {
  const highlightStyle = { backgroundColor: "yellow" };
  const boldStyle = { color: "red" };
  const standartStyle = { color: "black" };
  const { bold, highlight } = style;
  return (
    <button
      className="square"
      onClick={onClick}
      style={bold ? boldStyle : highlight ? highlightStyle : standartStyle}
    >
      {value}
    </button>
  );
}
