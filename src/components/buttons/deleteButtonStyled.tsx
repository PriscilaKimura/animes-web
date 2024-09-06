import styled from 'styled-components';
import { Button as AntButton } from 'antd';

const StyledDeleteButton = styled(AntButton)`

  width: 20%;  
  background-color: red; 
  color: white;
  border: none;
  &:hover {
  background-color: darkred; 
  }
`;

export default StyledDeleteButton;
