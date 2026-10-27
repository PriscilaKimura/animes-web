import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const BackLink = styled(Link)`
  display: inline-block;
  margin-bottom: 12px;
  color: #4a1d7e;
  font-family: 'Karla', sans-serif;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

export const FormContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

export const FormTitle = styled.h1`
  text-align: center;
  color: #333;
  margin-bottom: 20px;
`;

export const FormGroup = styled.div`
  margin-bottom: 15px;
`;

export const FormLabel = styled.label`
  display: block;
  margin-bottom: 5px;
  color: #555;
`;

export const FormInput = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const FormTextarea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: vertical;
`;

export const FormSelect = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const FormButton = styled.button`
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

export const FormError = styled.p`
  color: red;
  text-align: center;
  margin-top: 10px;
`;

export const FormCheckboxGroup = styled.div`
  display: flex;
  align-items: center; 
  margin-top: 5px;
`;

export const FormCheckboxInput = styled.input`
  margin-right: 10px;
`;

export const FormCheckboxLabel = styled.label`
  display: flex;
  align-items: center; 
  gap: 10px; 
  margin-top: 5px;
`;

export const CoverBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
`;

export const CoverPreview = styled.img`
  width: 140px;
  height: 190px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid #ccc;
`;

export const CoverEmpty = styled.div`
  width: 140px;
  height: 190px;
  border: 1px dashed #9b2929;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #9b2929;
  font-family: 'Karla', sans-serif;
`;

export const CoverActions = styled.div`
  display: flex;
  gap: 8px;
`;

export const CoverButton = styled.button`
  padding: 8px 12px;
  border: 1px solid #4a1d7e;
  border-radius: 4px;
  background: #fff;
  color: #4a1d7e;
  cursor: pointer;
`;

export const CoverHint = styled.p`
  margin: 0;
  color: #555;
  font-size: 0.9rem;
  text-align: left;
`;

export const FieldHint = styled.p`
  margin: 6px 0 0;
  color: #555;
  font-size: 0.85rem;
  text-align: left;
`;