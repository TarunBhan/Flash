import { Link } from "react-router-dom";
import styled from "styled-components";

export const LinkComponent = styled(Link)`
  border-radius: 12px;
  border: 1px solid black;
  justify-content: center;
  align-items: center;
  margin: 10px;
  padding: 7px;
  color: black;

  display: flex;
  &:hover {
    border: 1.5px solid black;
    box-shadow: rgba(0, 155, 123, 0.4) 0px 0px 5px 4px;
    color: black;
    transform: scale(1.1);
  }
  &:active {
    color: blue;
  }
`;

export const LogoutContainer = styled.div`
  &:hover {
    border: 1.5px solid black !important;
    box-shadow: rgba(0, 155, 123, 0.4) 0px 0px 5px 4px;
    color: black;
    transform: scale(1.1);
  }
  &:active {
    color: blue;
  }
`;
