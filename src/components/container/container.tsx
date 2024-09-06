import React from 'react';
import StyledContainer from './containerStyled';

const Container: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <StyledContainer>{children}</StyledContainer>;
};

export default Container;
