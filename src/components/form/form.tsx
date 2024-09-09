// Define a estrutura do formulário, utilizando os estilos importados de formStyled.tsx
import React from 'react';
import { FormContainer, FormTitle, FormGroup, FormLabel, FormInput, FormTextarea, FormSelect, FormButton, FormError, FormCheckboxLabel, FormCheckboxInput, FormCheckboxGroup } from './formStyled';

interface FormProps {
  title: string;
  description: string;
  releaseDate: string;
  completed: boolean;
  type: 'filme' | 'série';
  ranking?: number;
  onTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDescriptionChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onReleaseDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCompletedChange: () => void;
  onTypeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onRankingChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  error?: string;
}

const Form: React.FC<FormProps> = ({
  title,
  description,
  releaseDate,
  completed,
  type,
  ranking,
  onTitleChange,
  onDescriptionChange,
  onReleaseDateChange,
  onCompletedChange,
  onTypeChange,
  onRankingChange,
  onSubmit,
  error
}) => {
    return (
        <FormContainer>
          <FormTitle>Preencha o Formulário</FormTitle>
          <form onSubmit={onSubmit}>
            <FormGroup>
              <FormLabel>Título:</FormLabel>
              <FormInput type="text" value={title} onChange={onTitleChange} required />
            </FormGroup>
            <FormGroup>
              <FormLabel>Descrição:</FormLabel>
              <FormTextarea value={description} onChange={onDescriptionChange} required />
            </FormGroup>
            <FormGroup>
              <FormLabel>Data de Lançamento:</FormLabel>
              <FormInput type="date" value={releaseDate} onChange={onReleaseDateChange} required />
            </FormGroup>
            <FormGroup>
              <FormLabel>Completo:</FormLabel>
              <FormCheckboxGroup>
                <FormCheckboxInput type="checkbox" checked={completed} onChange={onCompletedChange} />
                <FormCheckboxLabel>Sim</FormCheckboxLabel>
              </FormCheckboxGroup>
            </FormGroup>
            <FormGroup>
              <FormLabel>Tipo:</FormLabel>
              <FormSelect value={type} onChange={onTypeChange}>
                <option value="filme">Filme</option>
                <option value="série">Série</option>
              </FormSelect>
            </FormGroup>
            <FormGroup>
              <FormLabel>Ranking:</FormLabel>
              <FormInput type="number" value={ranking !== undefined ? ranking : ''} onChange={onRankingChange} />
            </FormGroup>
            <FormButton type="submit">Enviar</FormButton>
            {error && <FormError>{error}</FormError>}
          </form>
        </FormContainer>
      );
    };
    
    export default Form;