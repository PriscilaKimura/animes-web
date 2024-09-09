import styled from 'styled-components';

const StyledContainer = styled.div`
  max-width: 1200px;  
  margin: 0 auto;     
  padding: 20px;     
  background-color: #f9f9f9;  
  border-radius: 8px; 
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);  
  display: grid; 
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); 
  gap: 20px; 

  img {
    display: block;
    margin: 0 auto; 
    max-width: 100%; 
    height: auto;
  }
  
  h1 {
    grid-column: 1 / -1; 
    text-align: center;
  }

  p.descriptive {
    grid-column: 1 / -1; 
    font-family: 'EB Garamond', serif; 
    font-size: 1.4rem; 
    line-height: 1.6; 
    color: #000; 
    text-align: center; 
    margin-bottom: 10px; 
    transition: color 0.3s ease; 
  }

  p.descriptive:hover {
    color: #333; 
  }

  button {
    grid-column: 1 / -1; 
    justify-self: center; 
    margin-top: 20px; 
    width: 120px; 
  }
`;

export default StyledContainer;


