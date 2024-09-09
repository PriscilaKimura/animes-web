import styled from 'styled-components';

const StyledHeader = styled.header`
  background-color: #B57EDC;
  color: #000; 
  padding: 13px 100px;
  display: flex;
  justify-content: flex-end; 
  align-items: center;
  font-family: 'Nerko One', cursive;
  
  nav {
    margin: 0;
  }

  nav ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    gap: 80px;
  }

  nav ul li {
    display: inline;
  }

  nav ul li a {
    color: #000; 
    text-decoration: none;
    font-size: 24px;
  }

  nav ul li a:hover {
    text-decoration: underline;
  }
`;

export default StyledHeader;

