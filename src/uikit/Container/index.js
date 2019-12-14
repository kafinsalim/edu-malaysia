import React from "react";
import styled from "styled-components";

const StyledContainer = styled.div`
  display: flex;
  padding: 16px auto;
  align-content: space-between;
`;

const Container = ({ children }) => {
  return <StyledContainer>{children}</StyledContainer>;
};

export default Container;
