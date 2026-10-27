import { useState } from 'react';
import { API_URL } from '../config/api';
import { Anime } from '../types/interface';

const useUpdateAnime = () => {
  const [error, setError] = useState<string | null>(null);

  const updateAnime = async (updatedAnime: Anime): Promise<Anime | null> => {
    try {
      const response = await fetch(`${API_URL}/anime/${updatedAnime.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedAnime),
      });
      if (!response.ok) {
        throw new Error('Erro ao atualizar o anime');
      }
      return await response.json();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Erro desconhecido ao atualizar o anime');
      }
      return null;
    }
  };

  return { updateAnime, error, setError };
};

export default useUpdateAnime;

