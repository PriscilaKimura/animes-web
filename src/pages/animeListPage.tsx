import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { AnimeContext } from '../context/animeContext';
import Button from '../components/buttons/button';
import StyledContainer from '../components/container/containerStyled';
import Card from '../components/cards/card';

const AnimeListPage: React.FC = () => {
  const context = useContext(AnimeContext);
  const location = useLocation();

  if (!context) {
    return <div>Contexto não disponível</div>;
  }

  const { animes, error, deleteAnime, refetch } = context;

  useEffect(() => {
    if (location.state?.updated) {
      refetch();
    }
  }, [location.state, refetch]);

  const handleDelete = async (id: string) => {
    try {
      await deleteAnime(id);
      refetch();
    } catch (err) {
      console.error('Erro ao excluir o anime:', err);
    }
  };

  if (error) {
    return <div>Erro ao buscar animes: {error}</div>;
  }

  return (
    <StyledContainer>
      <h1>Os Melhores Animes</h1>
      <Button to="/create">Adicione um Anime</Button>
      {animes.map((anime) => ( <Card 
            key={anime.id} 
            anime={anime} 
            onDelete={() => handleDelete(anime.id)} 
          />
        
      ))}
    </StyledContainer>
  );
};

export default AnimeListPage;






