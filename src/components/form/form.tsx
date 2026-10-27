import React, { useRef } from 'react';
import {
  BackLink,
  CoverActions,
  CoverBox,
  CoverButton,
  CoverEmpty,
  CoverHint,
  CoverPreview,
  FieldHint,
  FormButton,
  FormCheckboxGroup,
  FormCheckboxInput,
  FormCheckboxLabel,
  FormContainer,
  FormError,
  FormGroup,
  FormInput,
  FormLabel,
  FormSelect,
  FormTextarea,
  FormTitle,
} from './formStyled';

interface FormProps {
  heading: string;
  submitLabel: string;
  saving?: boolean;
  title: string;
  description: string;
  releaseDate: string;
  completed: boolean;
  type: 'filme' | 'série';
  ranking?: number;
  coverPreview?: string | null;
  coverUrl?: string;
  canClearCover?: boolean;
  onTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDescriptionChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onReleaseDateChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCompletedChange: () => void;
  onTypeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onRankingChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCoverSelect: (file: File | null) => void;
  onCoverUrlChange: (value: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  error?: string;
}

const Form: React.FC<FormProps> = ({
  heading,
  submitLabel,
  saving = false,
  title,
  description,
  releaseDate,
  completed,
  type,
  ranking,
  coverPreview,
  coverUrl = '',
  canClearCover = false,
  onTitleChange,
  onDescriptionChange,
  onReleaseDateChange,
  onCompletedChange,
  onTypeChange,
  onRankingChange,
  onCoverSelect,
  onCoverUrlChange,
  onSubmit,
  error,
}) => {
  const fileInput = useRef<HTMLInputElement>(null);

  const chooseCover = (event: React.ChangeEvent<HTMLInputElement>) => {
    onCoverSelect(event.target.files?.[0] ?? null);
    event.target.value = '';
  };

  return (
    <FormContainer>
      <BackLink to="/">← Voltar para a lista</BackLink>
      <FormTitle>{heading}</FormTitle>
      <form onSubmit={onSubmit}>
        <FormGroup>
          <FormLabel>Título</FormLabel>
          <FormInput type="text" value={title} onChange={onTitleChange} required />
        </FormGroup>
        <FormGroup>
          <FormLabel>Descrição</FormLabel>
          <FormTextarea value={description} onChange={onDescriptionChange} required />
        </FormGroup>
        <FormGroup>
          <FormLabel>Capa</FormLabel>
          <CoverBox>
            {coverPreview ? (
              <CoverPreview src={coverPreview} alt="Prévia da capa" />
            ) : (
              <CoverEmpty>Sem capa</CoverEmpty>
            )}
            <CoverActions>
              <CoverButton type="button" onClick={() => fileInput.current?.click()}>
                {coverPreview ? 'Trocar capa' : 'Escolher capa'}
              </CoverButton>
              {canClearCover && (
                <CoverButton type="button" onClick={() => onCoverSelect(null)}>
                  Desfazer
                </CoverButton>
              )}
            </CoverActions>
            <input
              ref={fileInput}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              hidden
              onChange={chooseCover}
            />
            <FormInput
              type="url"
              placeholder="https://..."
              value={coverUrl}
              onChange={(event) => onCoverUrlChange(event.target.value)}
            />
            <CoverHint>
              Não precisa da foto no computador. Na internet, clique com o botão direito na imagem, copie o endereço da imagem e cole aqui. Se a foto já estiver no PC, use Escolher capa.
            </CoverHint>
          </CoverBox>
        </FormGroup>
        <FormGroup>
          <FormLabel>Data de lançamento</FormLabel>
          <FormInput type="date" value={releaseDate} onChange={onReleaseDateChange} required />
        </FormGroup>
        <FormGroup>
          <FormLabel>Já assisti</FormLabel>
          <FormCheckboxGroup>
            <FormCheckboxInput type="checkbox" checked={completed} onChange={onCompletedChange} />
            <FormCheckboxLabel>Sim</FormCheckboxLabel>
          </FormCheckboxGroup>
        </FormGroup>
        <FormGroup>
          <FormLabel>Tipo</FormLabel>
          <FormSelect value={type} onChange={onTypeChange}>
            <option value="filme">Filme</option>
            <option value="série">Série</option>
          </FormSelect>
        </FormGroup>
        <FormGroup>
          <FormLabel>Ranking</FormLabel>
          <FormInput
            type="number"
            min={0}
            max={10}
            value={ranking !== undefined ? ranking : ''}
            onChange={onRankingChange}
          />
          <FieldHint>Opcional, de 0 a 10.</FieldHint>
        </FormGroup>
        <FormButton type="submit" disabled={saving}>
          {saving ? 'Salvando...' : submitLabel}
        </FormButton>
        {error && <FormError>{error}</FormError>}
      </form>
    </FormContainer>
  );
};

export default Form;
