//Página com um formulário para criar um novo item
import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAnimeForm from '../hooks/useFormAnime';
import { Anime } from '../types/interface';

const CreateAnimePage: React.FC = () => {
  const navigate = useNavigate();

  // Inicializa o hook com um estado inicial nulo
  const { title, setTitle, description, setDescription, releaseDate, setReleaseDate, completed, setCompleted, type, setType, ranking, setRanking, handleSubmit } = useAnimeForm(null);

  // Função para enviar o anime
  const submitAnime = async (anime: Partial<Anime>) => {
    try {
      const response = await fetch('http://localhost:8080/anime', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(anime),
      });
      if (!response.ok) throw new Error('Failed to create anime');
      navigate('/');
    } catch (error) {
      console.error('Error creating anime:', error);
    }
  };

  return (
    <div>
      <h1>Criar Novo Anime</h1>
      <form onSubmit={(event) => handleSubmit(event, submitAnime)}>
        <div>
          <label>Título:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label>Descrição:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div>
          <label>Data de Lançamento:</label>
          <input type="date" value={releaseDate} onChange={(e) => setReleaseDate(e.target.value)} required />
        </div>
        <div>
          <label>Completo:</label>
          <input type="checkbox" checked={completed} onChange={() => setCompleted(!completed)} />
        </div>
        <div>
          <label>Tipo:</label>
          <select value={type} onChange={(e) => setType(e.target.value as 'filme' | 'série')}>
            <option value="filme">Filme</option>
            <option value="série">Série</option>
          </select>
        </div>
        <div>
          <label>Ranking:</label>
          <input type="number" value={ranking !== undefined ? ranking : ''} onChange={(e) => setRanking(Number(e.target.value))} />
        </div>
        <button type="submit">Criar Anime</button>
      </form>
    </div>
  );
};

export default CreateAnimePage;