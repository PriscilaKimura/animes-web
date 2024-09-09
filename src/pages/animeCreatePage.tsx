//Página com um formulário para criar um novo item
import React from 'react';
import { useNavigate } from 'react-router-dom';
import useAnimeForm from '../hooks/useFormAnime';
import { Anime } from '../types/interface';
import Form from '../components/form/form';

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

   // Navega para a lista com o estado de criação
      navigate('/', { state: { created: true } });
        } catch (error) {
          console.error('Error:', error);
        }
      };
   
  // Funções de mudança de estado
  const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value);
  const onDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setDescription(e.target.value);
  const onReleaseDateChange = (e: React.ChangeEvent<HTMLInputElement>) => setReleaseDate(e.target.value);
  const onCompletedChange = () => setCompleted(!completed);
  const onTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => setType(e.target.value as 'filme' | 'série');
  const onRankingChange = (e: React.ChangeEvent<HTMLInputElement>) => setRanking(Number(e.target.value));

  return (
    <div>
      <h1>Adicionei um novo Anime</h1>
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
      />
    </div>
  );
};

export default CreateAnimePage;



