import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useUpdateAnime from '../hooks/useUpdateAnime';
import { Anime } from '../types/interface';
import useAnimeForm from '../hooks/useFormAnime';

const UpdateAnimePage: React.FC = () => {
  const { updateAnime, error, setError } = useUpdateAnime();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [initialAnime, setInitialAnime] = useState<Anime | null>(null);

  const { title, setTitle, description, setDescription, releaseDate, setReleaseDate, completed, setCompleted, type, setType, ranking, setRanking, handleSubmit } = useAnimeForm(initialAnime);

  useEffect(() => {
    const fetchAnime = async () => {
      try {
        if (!id) throw new Error('ID do anime não encontrado');
        const response = await fetch(`http://localhost:8080/anime/${id}`);
        if (!response.ok) throw new Error('Anime não encontrado');
        const data: Anime = await response.json();
        setInitialAnime(data);
        setTitle(data.title);
        setDescription(data.description);
        setReleaseDate(data.releaseDate);
        setCompleted(data.completed);
        setType(data.type);
        setRanking(data.ranking ?? undefined);
      } catch (err) {
        if (err instanceof Error) setError(err.message);
        else setError('Erro desconhecido ao buscar o anime');
      }
    };

    fetchAnime();
  }, [id, setError, setTitle, setDescription, setReleaseDate, setCompleted, setType, setRanking]);

  const submitAnime = async (anime: Partial<Anime>) => {
    if (!id) {
      console.error('ID do anime não encontrado');
      return;
    }

    // Preenche as propriedades ausentes com valores padrão
    const animeToUpdate: Anime = {
      id,
      title: anime.title ?? '',
      description: anime.description ?? '',
      releaseDate: anime.releaseDate ?? '',
      completed: anime.completed ?? false,
      type: anime.type ?? 'filme',
      imageUrl: '', 
      ranking: anime.ranking ?? 0, 
    };

    try {
      await updateAnime(animeToUpdate);
      navigate('/', { state: { updated: true } });
    } catch (error) {
      setError('Erro ao atualizar o anime');
    }
  };

  return (
    <div>
      <h1>Atualizar Anime</h1>
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
          <input type="number" value={ranking ?? ''} onChange={(e) => setRanking(e.target.value ? Number(e.target.value) : undefined)} />
        </div>
        <button type="submit">Atualizar Anime</button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default UpdateAnimePage;

