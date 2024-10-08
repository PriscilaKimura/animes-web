import React from 'react';
import { Anime } from '../../types/interface';
import Button from '../buttons/button';
import DeleteButton from '../buttons/deleteButton';
import animeImages from '../../../public/assets/animeImages';

interface CardProps {
    anime: Anime;
    onDelete: () => void;
  }
  
  const Card: React.FC<CardProps> = ({ anime, onDelete }) => {
    const imageSrc = animeImages[anime.id]; // Utilize o ID do anime para obter a imagem

  // Convertendo o formato da data
  const formattedDate = new Date(anime.releaseDate).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  return (
    <div>
      <h2>{anime.title}</h2>
      {imageSrc ? (
        <img 
          src={imageSrc} 
          alt={anime.title} 
          style={{ width: '200px', height: 'auto' }} 
        />
      ) : (
        <p>Imagem não disponível</p>
      )}
      <p>{anime.description}</p>
      <p>{anime.completed ? 'Completo' : 'Em andamento'}</p>
      {/* Mostrando a data formatada */}
      <p>Data de lançamento: {formattedDate}</p>
      <p>Tipo: {anime.type === 'filme' ? 'Filme' : 'Série'}</p>
      <p>Ranking: {anime.ranking}</p> 
      <Button to={`/update/${anime.id}`}>Editar</Button>
      <DeleteButton onClick={onDelete}>Excluir</DeleteButton>
    </div>
  );
};
  export default Card;
