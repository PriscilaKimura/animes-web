import React, { useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useUpdateAnime from '../hooks/useUpdateAnime';
import { Anime } from '../types/interface';
import useAnimeForm from '../hooks/useFormAnime';
import Form from '../components/form/form';
import { AnimeContext } from '../context/animeContext';

const UpdateAnimePage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Obtém o ID do anime da URL
  const navigate = useNavigate(); // Navegação programática
  const { updateAnime, error, setError } = useUpdateAnime(); // Hook para atualizar o anime
  const context = useContext(AnimeContext); // Usa o contexto para refetch
  const { refetch } = context || {}; 

  // Inicializa o hook do formulário com estado inicial nulo
  const { title, setTitle, description, setDescription, releaseDate, setReleaseDate, completed, setCompleted, type, setType, ranking, setRanking, handleSubmit } = useAnimeForm(null);

  // Função para buscar os dados do anime
  useEffect(() => {
    const fetchAnime = async () => {
      if (!id) return; // Garante que o ID está definido

      try {
        const response = await fetch(`http://localhost:8080/anime/${id}`);
        if (!response.ok) throw new Error('Falha ao buscar o anime');
        const fetchedAnime: Anime = await response.json();

        // Atualiza os campos do formulário com os dados do anime
        setTitle(fetchedAnime.title);
        setDescription(fetchedAnime.description);
        setReleaseDate(fetchedAnime.releaseDate);
        setCompleted(fetchedAnime.completed);
        setType(fetchedAnime.type);
        setRanking(fetchedAnime.ranking);
      } catch (error) {
        console.error('Erro ao buscar anime:', error);
        setError('Falha ao buscar os dados do anime.');
      }
    };

    fetchAnime(); // Busca o anime ao montar o componente
  }, [id, setTitle, setDescription, setReleaseDate, setCompleted, setType, setRanking, setError]);

  // Função para enviar o anime atualizado
  const submitAnime = async () => {
    if (!id) return; // Garante que o ID está definido

    const result = await updateAnime({
      id: id || '', // Garante que o ID é uma string
      title,
      description,
      releaseDate,
      completed,
      type,
      ranking,
    } as Anime);

    if (result) {
      if (refetch) refetch(); // Atualiza a lista de animes após a atualização
      navigate('/'); // Redireciona após a atualização
    }
  };

  // Funções para lidar com mudanças nos campos do formulário
  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
  const onDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value);
  const onReleaseDateChange = (e: React.ChangeEvent<HTMLInputElement>) => setReleaseDate(e.target.value);
  const onCompletedChange = () => setCompleted(!completed);
  const onTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => setType(e.target.value as 'filme' | 'série');
  const onRankingChange = (e: React.ChangeEvent<HTMLInputElement>) => setRanking(Number(e.target.value));

  return (
    <div>
      <h1>Edite o seu Anime</h1>
      <Form
        title={title}
        description={description}
        releaseDate={releaseDate}
        completed={completed}
        type={type}
        ranking={ranking}
        onTitleChange={onTitleChange}
        onDescriptionChange={onDescriptionChange}
        onReleaseDateChange={onReleaseDateChange}
        onCompletedChange={onCompletedChange}
        onTypeChange={onTypeChange}
        onRankingChange={onRankingChange}
        onSubmit={(e) => handleSubmit(e, submitAnime)}
        error={error ?? undefined} // Garante que 'error' é 'undefined' quando nulo
      />
    </div>
  );
};

export default UpdateAnimePage;


