import React, { useContext } from 'react';
import { AnimeContext } from '../context/animeContext';
import Button from '../components/buttons/button';
import StyledContainer from '../components/container/containerStyled';
import Card from '../components/cards/card';

const AnimeListPage: React.FC = () => {
  const context = useContext(AnimeContext);

  if (!context) {
    return <p>A lista de animes não está disponível.</p>;
  }

  const { animes, error, loading, deleteAnime, refetch } = context;

  if (loading && animes.length === 0) {
    return <p>Carregando animes...</p>;
  }

  if (error && animes.length === 0) {
    return (
      <StyledContainer>
        <p>{error}</p>
        <button type="button" onClick={refetch}>Tentar de novo</button>
      </StyledContainer>
    );
  }

  return (
    <StyledContainer>
      <h1>Os Melhores Animes</h1>
      <p className="descriptive">
        Explore uma seleção dos melhores animes, incluindo obras-primas do Studio Ghibli, como "Meu Amigo Totoro" e "O Serviço de Entregas da Kiki", conhecidos por suas histórias encantadoras e animação impecável. Além disso, descubra clássicos dos anos 80 e 90, como "Dragon Ball", "Akira", e "Neon Genesis Evangelion", que ajudaram a moldar o gênero e a popularizar o anime globalmente.
      </p>
      <p className="descriptive">Adicione os animes que você mais gosta.</p>
      <Button to="/create">Adicionar</Button>
      {animes.length === 0 ? (
        <p>Nenhum anime ainda. Use o botão acima para incluir o primeiro.</p>
      ) : (
        animes.map((anime) => (
          <Card
            key={anime.id}
            anime={anime}
            onDelete={() => deleteAnime(anime.id)}
          />
        ))
      )}
    </StyledContainer>
  );
};

export default AnimeListPage;
