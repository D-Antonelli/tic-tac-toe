import styled from "styled-components";
import device from "./media-queries";

export const StyledGameInfo = styled.div`
  height: 90%;
  min-width: 30vmax;
  margin-left: 0;

  @media ${device.laptop} and ${device.minHeight}, ${device.tablet} {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

export const InfoList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 2vmin;
`;

export const StatusText = styled.h2`
  color: #34ff22;
  -webkit-text-stroke: 1px black;
  margin:0;
  padding: 0;
`;

export const StatusWrapper = styled.div`
  height: 10rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Moves = styled.li`
  margin-bottom: 0.5rem;
  &:nth-child(1n) {
    transform: skewX(8deg) skewY(-1deg);
  }

  &:nth-child(2n) {
    transform: skewX(-8deg) skewY(2deg);
  }

  @media ${device.laptop} and ${device.minHeight}, ${device.tablet} {
    display: none;
  }
`;

export const JumpBtn = styled.button`
  cursor: pointer;
  -webkit-box-shadow: 2px 5px 16px 0px #0b325e,
    6px 6px 8px -3px rgba(255, 255, 255, 0);
  box-shadow: 2px 5px 16px 0px #0b325e, 6px 6px 8px -3px rgba(255, 255, 255, 0);

  &:hover {
    background: linear-gradient(10deg, #34ff22 0 50%, #e4ff03 50% 100%);
    transform: scale(1.03);
  }

  &:active {
    transform: translateY(3px);
  }
`;

export const RestartButton = styled(JumpBtn)`
  background: yellow;
  border-radius: 30px;
`;

export const BtnText = styled(StatusText)`
  padding: 1vw .5vw;
  margin: 0;
  color: red;
`;
