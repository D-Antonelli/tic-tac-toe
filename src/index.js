import Game from "./components/game";
import ReactDOM from "react-dom";
import { createGlobalStyle } from "styled-components";
import React from "react";

const Styled = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Bangers&display=swap');
* {
    box-sizing: border-box;
    }

  html {
    font-size: 62.5%;
  }  

  body {
    margin: 0;
    padding: 0;
    background-color: #642b9d;
    overflow: hidden;
  }

  body,
  button {
    font-family: 'Bangers', cursive;
    font-size: 2vmax;
  }
`;

ReactDOM.render(
  <React.StrictMode>
    <Styled />
    <Game />
  </React.StrictMode>,
  document.getElementById("root")
);
