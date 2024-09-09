import styled from 'styled-components';
import { Button as AntButton } from 'antd';

const StyledButton = styled(AntButton)`
  width: 20%;
  margin: 0.5rem 0;
  background-color: #1890ff; 
  color: white; 
  border: none; 
  &:hover {
  background-color: #40a9ff; 
  }
`;

export default StyledButton;