import React from 'react';
import StyledDeleteButton from './deleteButtonStyled';

interface DeleteButtonProps {
    onClick: () => void;
    children: React.ReactNode;
  }
  
  const DeleteButton: React.FC<DeleteButtonProps> = ({ onClick, children }) => {
    return <StyledDeleteButton onClick={onClick}>{children}</StyledDeleteButton>;
  };
  
  export default DeleteButton;
