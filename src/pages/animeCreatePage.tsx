//Página com um formulário para criar um novo item
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Anime } from '../types/interface'; 

function CreateAnimePage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [completed, setCompleted] = useState(false);
  const [type, setType] = useState<'filme' | 'série'>('filme'); 

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const newAnime = { 
      title, 
      description, 
      releaseDate, 
      completed, 
      type 
    };

    try {
      const response = await fetch('http://localhost:8080/anime', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newAnime),
      });

      if (!response.ok) {
        throw new Error('Failed to create anime');
      }

      navigate('/');
    } catch (error) {
      console.error('Error creating anime:', error);
    }
  };

  return (
    <div>
      <h1>Criar Novo Anime</h1>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Criar Anime</button>
      </form>
    </div>
  );
}

export default CreateAnimePage;


