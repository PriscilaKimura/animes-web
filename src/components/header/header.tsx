import React from 'react';
import { Link } from 'react-router-dom';
import StyledHeader from './headerStyled';

const Header: React.FC = () => {
  return (
    <StyledHeader translate="no">
      <nav>
        <ul>
          <li><Link to="/">Início</Link></li>
          <li><Link to="/create">Adicionar</Link></li>
        </ul>
      </nav>
    </StyledHeader>
  );
};

export default Header;
