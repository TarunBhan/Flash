import styled from "styled-components";

export const SendButtonWrapper = styled.div`
  &:hover {
    opacity: 0.7;
  }
`;

export const InputWrapper = styled.div`
  @media screen and (max-width: 600px) {
    width: 90% !important;
    padding: 0 !important;
    padding-right: 10px;
  }
`;

export const RecentSection = styled.div`
  @media screen and (max-width: 600px) {
    width: 40% !important;
  }
`;
