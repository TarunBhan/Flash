import styled from "styled-components";

export const ProgressBar = styled.div<{
  width?: string;
  color?: string;
  animationName: string;
}>`
  width: ${({ width = "0%" }) => width};
  background-color: ${({ color }) => color};

  height: 19px;
  border-radius: 30px;
  transition: 0.2s linear;
  transition-property: width, background-color;
  animation: ${({ animationName = "ProgressAnimation" }) => animationName} 2s;
  @keyframes ${({ animationName = "ProgressAnimation" }) => animationName} {
    0% {
      width: 0%;
      background-color: ${({ color }) => color};
    }
    100% {
      width: ${({ width = "0%" }) => width};
      background-color: ${({ color }) => color};
    }
  }
`;

export const CustomButton = styled.button`
  width: 70%;
  border-color: transparent;
  border-radius: 8px;
  align-self: center;
  align-items: center;
  margin-top: 19px;
  cursor: pointer;
  background-color: #059ce8;
  transition: background 1s;
  &:hover {
    background-color: #17a7f5;
    background-image: radial-gradient(circle, transparent 1%, #47a7f5 1%);
    background-size: 15000%;
    background-position: center;
  }
  &:active {
    transition: background 0s;
    background-color: #6eb9f7;
    background-size: 100%;
  }
`;
