import styled from "styled-components";
import { appear } from "./animation";

export const Tile = styled.button.attrs({'aria-label': "make next move"})`
  float: left;
  line-height: 3.4rem;
  cursor: pointer;
  width: 22vmin;
  height: 22vmin;
  margin-right: -1px;
  margin-top: -1px;
  padding: 0;
  text-align: center;
  border: none;
  border-right: ${({ position }) =>
    position !== 2 &&
    position !== 5 &&
    position !== 8 &&
    "1vmin solid #e4ff03"};
  border-bottom: ${({ position }) =>
    position !== 6 &&
    position !== 7 &&
    position !== 8 &&
    "1vmin solid #e4ff03"};
  background-color: ${({ style }) =>
    (style.highlight && "yellow") || "#642b9d"};
  font-size: 5.5vmax;
  color: ${({ style }) => (style.bold && "#FF5F00") || "#28C31A"};
  -webkit-text-stroke: 2px black;
`;

export const Move = styled.span`
  display: inline-block;
  animation-name: ${({ value }) => value && appear};
  animation-duration: 0.2s;
  animation-timing-function: cubic-bezier(0.5, 1.8, 0.1, 1.1);
`;
