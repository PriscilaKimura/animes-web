import React from 'react';
import { Anime } from '../../types/interface';
import Button from '../buttons/button';
import DeleteButton from '../buttons/deleteButton';
import animeImages from '../../assets/animeImages';

interface CardProps {
    anime: Anime;
    onDelete: () => void;
  }
  
  const Card: React.FC<CardProps> = ({ anime, onDelete }) => {
    const imageSrc = animeImages[anime.id]; // Utilize o ID do anime para obter a imagem
  
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
        <p>Data de lançamento: {anime.releaseDate}</p>
        <p>Tipo: {anime.type === 'filme' ? 'Filme' : 'Série'}</p>
        <Button to={`/update/${anime.id}`}>Editar</Button>
        <DeleteButton onClick={onDelete}>Excluir</DeleteButton>
      </div>
    );
  };
  
  export default Card;

// interface CardProps {
//   anime: Anime;
//   onDelete: () => void;
// }

// const Card: React.FC<CardProps> = ({ anime, onDelete }) => {
//   return (
//     <div>
//       <h2>{anime.title}</h2>
//       {animeImages[anime.id] ? (
//         <img 
//           src={animeImages[anime.id]} 
//           alt={anime.title} 
//           style={{ width: '200px', height: 'auto' }} 
//         />
//       ) : (
//         <p>Imagem não disponível</p>
//       )}
//       <p>{anime.description}</p>
//       <p>{anime.completed ? 'Completo' : 'Em andamento'}</p>
//       <p>Data de lançamento: {anime.releaseDate}</p>
//       <p>Tipo: {anime.type === 'filme' ? 'Filme' : 'Série'}</p>
//       <Button to={`/update/${anime.id}`}>Editar</Button>
//       <DeleteButton onClick={onDelete}>Excluir</DeleteButton>
//     </div>
//   );
// };

// export default Card;


