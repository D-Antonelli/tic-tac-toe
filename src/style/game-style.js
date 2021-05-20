import styled from "styled-components";
import device from "./media-queries";

export const Header = styled.header`
  display: flex;
  margin-bottom: 5.5vh;
  justify-content: center;
  height: 9vh;
  position: relative;

  @media ${device.laptop} and ${device.minHeight} {
    height: 1vh;
  }

  @media ${device.tablet} {
    height: 0;
  }
`;

export const Title = styled.h1`
  color: #e4ff03;
  -webkit-text-stroke: 2px black;

  @media ${device.mobileL} {
    -webkit-text-stroke: 1px black;
  }
`;

export const Content = styled.main`
  margin: 0 auto;
  position: relative;
  ${"" /* width: 65%; */}
  height: 82vh;
  display: flex;
  align-items: center;
  justify-content: center;
  @media ${device.laptop} and ${device.minHeight},
    ${device.mobileL},
    ${device.tablet} {
    flex-direction: column-reverse;
    justify-content: space-between;
  }

  @media ${device.tablet} and (max-height: 799px) {
    height: 85vh;
  }

  @media ${device.tablet} and (max-height: 464px) {
    height: 90vh;
    flex-direction: row;
    justify-content: space-around;
  }

  @media ${device.mobileL} {
    height: 85vh;
  }

  @media ${device.mobileL} and (min-height: 464px) {
    height: 80vh;
  }
`;

export const GameBoard = styled.div`
  margin-right: 10vw;
  flex-shrink: 0;

  @media ${device.laptop} and ${device.minHeight}, ${device.tablet} {
    margin-right: 0;
  }

  @media ${device.tablet} {
    height: 45vh;
  }
`;

