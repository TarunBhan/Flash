import styled, { keyframes } from "styled-components";

export const SendButtonWrapper = styled.div`
  &:hover {
    opacity: 0.7;
  }
`;

export const InputWrapper = styled.div`
  @media screen and (max-width: 600px) {
    width: 100% !important;
    padding: 0 !important;
    padding-right: 10px;
  }
`;

export const RecentSection = styled.div`
  @media screen and (max-width: 600px) {
    width: 40% !important;
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -100% 0;
  }
  100% {
    background-position: 100% 0;
  }
`;

// Create a styled component for the shimmer effect
export const Shimmer = styled.div`
  width: 100%;
  height: 20px !important;
  background: linear-gradient(
    to right,
    #f0f0f0 0%,
    #e0e0e0 20%,
    #f0f0f0 40%,
    #f0f0f0 100%
  );
  overflow: hidden;
  border-radius: 12px;
  border-color: transparent;
  border: 1px solid transparent;
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite;
  margin-block: 10px;
  z-index: -10px;
`;

// Example usage of the Shimmer component
export const ShimmerExample = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
  position: relative;
`;
export const HeadingContainer = styled.div`
  font-family: "Arial, sans-serif";
  font-size: 1.5em;
  font-weight: bold;
  color: #2c3e50;
  text-align: center;
  margin-bottom: 20px;
  margin-top: 10px;
`;
