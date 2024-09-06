import { useState } from 'react';

const useDeleteAnime = () => {
  const [error, setError] = useState<string | null>(null);

  const deleteAnime = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:8080/anime/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Falha ao excluir o anime');
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Erro desconhecido');
      }
    }
  };

  return { deleteAnime, error };
};

export default useDeleteAnime;



