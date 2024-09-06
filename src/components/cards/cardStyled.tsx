import styled from 'styled-components';


const StyledCard = styled.div`
  background-color: #fff; 
  border-radius: 8px; 
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
  padding: 16px; 
  text-align: center; 
  display: flex; 
  flex-direction: column; 
  align-items: center; 

  img {
    border-radius: 8px; 
    max-width: 100%; 
    height: auto; 
  }

  h2 {
    margin: 8px 0; 
    font-size: 1.5rem; 
  }

  p {
    margin: 4px 0; 
    font-size: 1rem; 
  }

  button {
    margin-top: 8px; 
  }
`;

export default StyledCard;
