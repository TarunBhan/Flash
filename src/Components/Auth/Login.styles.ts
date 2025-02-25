import styled from "styled-components";

export const FormWrapper = styled.div`
  @media screen and (max-width: 600px) {
    height: 550px !important;
    margin-top: 60px !important;
  }
`;

export const ImageWrapper = styled.div`
  @media screen and (max-width: 600px) {
    display: none !important;
  }
`;

export const HeaderImage = styled.div`
  margin-block: 35px !important;
  @media screen and (min-width: 600px) {
    display: none !important;
  }
`;

export const GuestButton = styled.div`
  height: 40px;
  width: 120px;
  background: rgb(0, 155, 123);
  padding: 10px;
  justify-content: center;
  align-items: center;
  display: flex;
  border-radius: 12px;
  cursor: pointer;
  &:hover {
    box-shadow: rgba(0, 155, 123, 0.4) 0px 0px 9px 9px;
  }
`;
