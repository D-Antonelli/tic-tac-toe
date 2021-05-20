import styled from "styled-components";

export const StyledFooter = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 4vmax;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Credits = styled.span`
  font-size: 3vmin;
`;

export const Link = styled.button`
  color: black;
  transition: 0.2s ease;

  &:hover {
    color: yellow;
  }
`;