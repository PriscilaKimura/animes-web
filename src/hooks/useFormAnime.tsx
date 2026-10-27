import { useState } from 'react';
import { Anime } from '../types/interface';

  const useAnimeForm = (initialState: Partial<Anime> | null) => {
    const [title, setTitle] = useState(initialState?.title || '');
    const [description, setDescription] = useState(initialState?.description || '');
    const [releaseDate, setReleaseDate] = useState(initialState?.releaseDate || '');
    const [completed, setCompleted] = useState(initialState?.completed || false);
    const [type, setType] = useState<'filme' | 'série'>(initialState?.type || 'filme');
    const [ranking, setRanking] = useState<number | undefined>(initialState?.ranking);
    const [imageUrl, setImageUrl] = useState(initialState?.imageUrl || '');
  
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>, submitFn: (anime: Partial<Anime>) => Promise<void>) => {
      event.preventDefault();

      const anime: Partial<Anime> = {
        title,
        description,
        releaseDate,
        completed,
        type,
        ranking,
        imageUrl: imageUrl.trim() || undefined,
      };
      await submitFn(anime);
    };
  
    return {
      title,
      setTitle,
      description,
      setDescription,
      releaseDate,
      setReleaseDate,
      completed,
      setCompleted,
      type,
      setType,
      ranking,
      setRanking,
      imageUrl,
      setImageUrl,
      handleSubmit
    };
  };
  
  export default useAnimeForm;

