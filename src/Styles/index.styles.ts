import styled from "styled-components";
import baseTheme from "../Components/Theme/baseTheme";

export const Text = styled.text<{
  fontSize?: number;
  fontWeight?: number;
  fontStyle?: string;
  color?: string;
}>`
  font-size: ${({ fontSize = baseTheme.fontSizes[3] }) => fontSize}px;
  font-weight: ${({ fontWeight = baseTheme.fontWeights[4] }) => fontWeight};
  font-family: ${({ fontStyle = baseTheme.fonts.secondary }) => fontStyle};
  color: ${({ color = baseTheme.colors.black }) => color};
`;
