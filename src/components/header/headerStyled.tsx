import styled from 'styled-components';

const StyledHeader = styled.header`
  background-color: #B57EDC;
  color: #000; 
  padding: 12px 80px;
  display: flex;
  justify-content: flex-end; 
  align-items: center;
  
  nav {
    margin: 0;
  }

  nav ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    gap: 55px;
  }

  nav ul li {
    display: inline;
  }

  nav ul li a {
    color: #000; 
    text-decoration: none;
    font-size: 20px;
  }

  nav ul li a:hover {
    text-decoration: underline;
  }
`;

export default StyledHeader;

