import styled from 'styled-components';

const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 20;
  background-color: #B57EDC;
  color: #000;
  box-sizing: border-box;
  padding: 16px 32px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-family: 'Karla', sans-serif;
  
  nav {
    margin: 0;
  }

  nav ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    gap: 20px;
  }

  nav ul li {
    display: inline;
  }

  nav ul li a {
    color: #000; 
    text-decoration: none;
    font-size: 16px;
    font-weight: 700;
    white-space: nowrap;
  }

  nav ul li a:hover {
    text-decoration: underline;
  }
`;

export default StyledHeader;

