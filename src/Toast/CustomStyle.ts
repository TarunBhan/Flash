import styled from "styled-components";

export const ToastWrapper = styled.div`
  & .Toastify__close-button {
    align-self: auto;
    margin-right: 27px;
    @media screen and (max-width: 576px) {
      align-self: flex-start;
      margin: auto;
    }
  }
  & .Toastify__toast-theme--colored {
    margin: 19px;
  }
  & .Toastify__toast-icon {
    margin-left: 24px;
    @media screen and (max-width: 576px) {
      margin-left: auto;
    }
  }
  & .Toastify__toast-body > div:last-child {
    font-size: 18px;
    line-height: 22px;
    @media screen and (max-width: 576px) {
      font-size: 14px;
      line-height: 17px;
    }
  }
  & .Toastify__toast--default {
    & .Toastify__close-button {
      display: none;
    }
  }
`;
