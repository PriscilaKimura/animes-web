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
    console.log('Location state:', location.state); 
    if (location.state?.created) {
      refetch(); // Atualiza a lista quando um novo anime foi criado
    }
  }, [location.state, refetch]);

  const handleDelete = async (id: string) => {
    try {
      await deleteAnime(id);
      // Atualiza a lista após a exclusão
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
      <p className="descriptive"> Explore uma seleção dos melhores animes, incluindo obras-primas do Studio Ghibli, como "A Viagem de Chihiro" e "Meu Amigo Totoro", conhecidos por suas histórias encantadoras e animação impecável. Além disso, descubra clássicos dos anos 80 e 90, como "Dragon Ball", "Akira", e "Neon Genesis Evangelion", que ajudaram a moldar o gênero e a popularizar o anime globalmente.</p>
      <Button to="/create">Adicione um Anime</Button>
      {animes.map((anime) => ( 
        <Card 
            key={anime.id} 
            anime={anime} 
            onDelete={() => handleDelete(anime.id)} 
        />
      ))}
    </StyledContainer>
  );
};

export default AnimeListPage;








