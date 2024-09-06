// Hook personalizado chamado useFetchAnime para encapsular a lógica de busca de anime
import { useState, useEffect } from 'react';
import { Anime } from '../types/interface'; 

const useFetchAnime = () => {
  const [animes, setAnimes] = useState<Anime[]>([]);
  const [error, setError] = useState<string | null>(null); 
  const [loading, setLoading] = useState<boolean>(false); 

  // Função para buscar os animes
  const fetchAnimes = async () => {
    setLoading(true); // Inicia o estado de carregamento
    try {
      const response = await fetch('http://localhost:8080/anime');
      if (!response.ok) {
        throw new Error('Erro ao buscar os animes. Tente novamente.');
      }
      const data: Anime[] = await response.json();
      setAnimes(data);
      setError(null); // Limpa o erro caso tenha sido corrigido
    } catch (error) {
      setError((error as Error).message); // Armazena apenas a mensagem de erro
    } finally {
      setLoading(false); // Finaliza o carregamento
    }
  };

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      fetchAnimes();
    }

    // Limpeza para evitar atualização de estado em componentes desmontados
    return () => {
      isMounted = false;
    };
  }, []);

  // Função para atualizar a lista de animes
  const refetch = () => {
    fetchAnimes();
  };

  return { animes, error, loading, refetch };
};

export default useFetchAnime;

