import React from 'react';
import { Link } from 'react-router-dom';
import { Button as AntButton } from 'antd';
import styled from 'styled-components';

const StyledButton = styled(AntButton)`
  width: 30%;
  margin: 0.5rem 0;
  background-color: #1890ff; 
  color: white; 
  border: none; 
  &:hover {
    background-color: #40a9ff; 
  }
`;

interface ButtonProps {
  to: string; // A URL para a navegação
  children: React.ReactNode; // O conteúdo do botão
}

// Componente Button
const Button: React.FC<ButtonProps> = ({ to, children }) => {
  return (
    <StyledButton>
      <Link to={to} style={{ textDecoration: 'none', color: 'inherit' }}>
        {children}
      </Link>
    </StyledButton>
  );
};

export default Button;

