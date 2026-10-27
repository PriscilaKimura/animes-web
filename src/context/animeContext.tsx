import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { io } from 'socket.io-client';
import { API_URL } from '../config/api';
import { Anime } from '../types/interface';

interface AnimeContextType {
  animes: Anime[];
  error: string | null;
  loading: boolean;
  refetch: () => void;
  deleteAnime: (id: string) => Promise<void>;
}

const AnimeContext = createContext<AnimeContextType | undefined>(undefined);

const AnimeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [animes, setAnimes] = useState<Anime[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchAnimeList = async () => {
    try {
      const response = await fetch(`${API_URL}/anime`);
      if (!response.ok) {
        throw new Error('Erro ao buscar a lista de animes');
      }
      const data: Anime[] = await response.json();
      setAnimes(data);
      setError(null);
    } catch (err) {
      setError('Erro ao buscar a lista de animes');
    } finally {
      setLoading(false);
    }
  };

  const deleteAnime = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/anime/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Erro ao deletar o anime');
      }
      setAnimes((current) => current.filter((anime) => anime.id !== id));
    } catch (err) {
      setError('Erro ao deletar o anime');
    }
  };

  useEffect(() => {
    fetchAnimeList();

    const socket = io(API_URL, { transports: ['websocket'] });

    socket.on('anime.created', (anime: Anime) => {
      setAnimes((current) =>
        current.some((item) => item.id === anime.id) ? current : [...current, anime],
      );
    });

    socket.on('anime.updated', (anime: Anime) => {
      setAnimes((current) =>
        current.map((item) => (item.id === anime.id ? anime : item)),
      );
    });

    socket.on('anime.deleted', ({ id }: { id: string }) => {
      setAnimes((current) => current.filter((anime) => anime.id !== id));
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
      <AnimeContext.Provider value={{ animes, error, loading, refetch: fetchAnimeList, deleteAnime }}>
      {children}
    </AnimeContext.Provider>
  );
};

export { AnimeContext, AnimeProvider };
