import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Anime } from '../types/interface';

interface AnimeContextType {
    animes: Anime[];
    error: string | null;
    refetch: () => void;
    deleteAnime: (id: string) => Promise<void>;
  }
  
  const AnimeContext = createContext<AnimeContextType | undefined>(undefined);
  
  const AnimeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [animes, setAnimes] = useState<Anime[]>([]);
    const [error, setError] = useState<string | null>(null);
  
    const fetchAnimeList = async () => {
      try {
        const response = await fetch('http://localhost:8080/anime');
        if (!response.ok) {
          throw new Error('Erro ao buscar a lista de animes');
        }
        const data: Anime[] = await response.json();
        setAnimes(data);
      } catch (err) {
        setError('Erro ao buscar a lista de animes');
      }
    };
  
    const deleteAnime = async (id: string) => {
      try {
        const response = await fetch(`http://localhost:8080/anime/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Erro ao deletar o anime');
        }
        await fetchAnimeList(); // Atualiza a lista de animes após a exclusão
      } catch (err) {
        setError('Erro ao deletar o anime');
      }
    };
  
    // Inicializa a lista de animes ao montar o componente
    useEffect(() => {
      fetchAnimeList();
    }, []);
  
    return (
      <AnimeContext.Provider value={{ animes, error, refetch: fetchAnimeList, deleteAnime }}>
        {children}
      </AnimeContext.Provider>
    );
  };
  
  export { AnimeContext, AnimeProvider };




  














