import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useUpdateAnime from '../hooks/useUpdateAnime';
import { Anime } from '../types/interface';

const UpdateAnimePage: React.FC = () => {
    const { updateAnime, error, setError } = useUpdateAnime(); 
    const { id } = useParams<{ id: string }>();
    const [anime, setAnime] = useState<Anime | null>(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [releaseDate, setReleaseDate] = useState('');
    const [completed, setCompleted] = useState(false);
    const [type, setType] = useState<'filme' | 'série'>('filme');
    const navigate = useNavigate();
  
    useEffect(() => {
      const fetchAnime = async () => {
        try {
          const response = await fetch(`http://localhost:8080/anime/${id}`);
          if (!response.ok) {
            throw new Error('Anime não encontrado');
          }
          const data = await response.json();
          setAnime(data);
          setTitle(data.title);
          setDescription(data.description);
          setReleaseDate(data.releaseDate);
          setCompleted(data.completed);
          setType(data.type);
        } catch (err) {
          if (err instanceof Error) {
            setError(err.message);
          } else {
            setError('Erro desconhecido ao buscar o anime');
          }
        }
      };
  
      if (id) {
        fetchAnime();
      }
    }, [id, setError]);
  
    const handleSubmit = async (event: React.FormEvent) => {
      event.preventDefault();
  
      if (anime) {
        const updatedAnime: Anime = { ...anime, title, description, releaseDate, completed, type };
        try {
          await updateAnime(updatedAnime);
          navigate('/', { state: { updated: true } }); // navega p/ página de listagem e adiciona uma flag de estado ao redirecionar
        } catch (err) {
          setError('Erro ao atualizar o anime');
        }
      }
    };
  
    return (
      <div>
        <h1>Atualizar Anime</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title">Título:</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="description">Descrição:</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="releaseDate">Data de Lançamento:</label>
            <input
              id="releaseDate"
              type="date"
              value={releaseDate}
              onChange={(e) => setReleaseDate(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="completed">Completo:</label>
            <input
              id="completed"
              type="checkbox"
              checked={completed}
              onChange={() => setCompleted(!completed)}
            />
          </div>
          <div>
            <label htmlFor="type">Tipo:</label>
            <select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value as 'filme' | 'série')}
            >
              <option value="filme">Filme</option>
              <option value="série">Série</option>
            </select>
          </div>
          <button type="submit">Atualizar Anime</button>
        </form>
        {error && <p>{error}</p>}
      </div>
    );
  };
  
  export default UpdateAnimePage;