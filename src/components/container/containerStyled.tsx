import styled from 'styled-components';

const StyledContainer = styled.div`
  max-width: 1200px;  
  margin: 0 auto;     
  padding: 20px;     
  background-color: #f9f9f9;  
  border-radius: 8px; 
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);  
  display: grid; 
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); /* Define o número de colunas e seu tamanho */
  gap: 20px; 

  img {
    display: block;
    margin: 0 auto; /* Centraliza as imagens */
    max-width: 100%; /* Garante que a imagem não ultrapasse o contêiner */
    height: auto;
  }

   button {
    justify-self: center; 
    margin-top: 60px; 
    grid-column: span 2; 
  }
`;

export default StyledContainer;

