import React, { useState } from 'react';
import { Anime } from '../../types/interface';
import Button from '../buttons/button';
import DeleteButton from '../buttons/deleteButton';
import StyledCard from './cardStyled';

interface CardProps {
  anime: Anime;
  onDelete: () => void;
}

const Card: React.FC<CardProps> = ({ anime, onDelete }) => {
  const [confirming, setConfirming] = useState(false);
  const [year, month, day] = anime.releaseDate.slice(0, 10).split('-');
  const formattedDate = year && month && day
    ? `${day}/${month}/${year}`
    : anime.releaseDate;

  return (
    <StyledCard>
      <h2>{anime.title}</h2>
      {anime.imageUrl ? (
        <img src={anime.imageUrl} alt={`Capa de ${anime.title}`} />
      ) : (
        <p>Sem capa</p>
      )}
      <p>{anime.description}</p>
      <p>{anime.completed ? 'Já assisti' : 'Quero assistir'}</p>
      <p>Data de lançamento: {formattedDate}</p>
      <p>Tipo: {anime.type === 'filme' ? 'Filme' : 'Série'}</p>
      <p>Ranking: {anime.ranking ?? '—'}</p>
      <Button to={`/update/${anime.id}`}>Editar</Button>
      {confirming ? (
        <>
          <DeleteButton onClick={onDelete}>Confirmar exclusão</DeleteButton>
          <button type="button" onClick={() => setConfirming(false)}>Cancelar</button>
        </>
      ) : (
        <DeleteButton onClick={() => setConfirming(true)}>Excluir</DeleteButton>
      )}
    </StyledCard>
  );
};

export default Card;
