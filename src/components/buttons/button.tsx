import React from 'react';
import { Link } from 'react-router-dom';
import { Button as AntButton } from 'antd';
import styled from 'styled-components';

const StyledButton = styled(AntButton)`
  &&& {
    width: fit-content;
    min-width: 140px;
    height: auto;
    margin: 0.5rem 0;
    padding: 8px 24px;
    white-space: nowrap;
    overflow: visible;
    background-color: #1890ff;
    color: white;
    border: none;
  }

  &&&:hover {
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

