import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import useUpdateAnime from '../hooks/useUpdateAnime';
import { Anime } from '../types/interface';
import useAnimeForm from '../hooks/useFormAnime';
import Form from '../components/form/form';
import { API_URL } from '../config/api';
import { AnimeContext } from '../context/animeContext';
import { uploadCover } from '../services/uploadCover';

const UpdateAnimePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { updateAnime, error, setError } = useUpdateAnime();
  const context = useContext(AnimeContext);
  const { refetch } = context || {};
  const {
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
    handleSubmit,
  } = useAnimeForm(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (location.state?.coverError) {
      setError('O anime foi salvo, mas a capa não. Escolha a imagem de novo e salve.');
    }
  }, [location.state, setError]);

  useEffect(() => {
    const fetchAnime = async () => {
      if (!id) return;
      try {
        const response = await fetch(`${API_URL}/anime/${id}`);
        if (!response.ok) throw new Error('Falha ao buscar o anime');
        const fetchedAnime: Anime = await response.json();
        setTitle(fetchedAnime.title);
        setDescription(fetchedAnime.description);
        setReleaseDate(fetchedAnime.releaseDate?.slice(0, 10) ?? '');
        setCompleted(fetchedAnime.completed);
        setType(fetchedAnime.type);
        setRanking(fetchedAnime.ranking);
        setImageUrl(fetchedAnime.imageUrl ?? '');
      } catch {
        setError('Falha ao buscar os dados do anime.');
      } finally {
        setLoading(false);
      }
    };

    fetchAnime();
  }, [id, setTitle, setDescription, setReleaseDate, setCompleted, setType, setRanking, setImageUrl, setError]);

  const onCoverSelect = (file: File | null) => {
    setCoverPreview((current) => {
      if (current?.startsWith('blob:')) URL.revokeObjectURL(current);
      return file ? URL.createObjectURL(file) : null;
    });
    setCoverFile(file);
  };

  const submitAnime = async () => {
    if (!id) return;
    setSaving(true);
    const result = await updateAnime({
      id,
      title,
      description,
      releaseDate,
      completed,
      type,
      ranking,
      imageUrl: imageUrl.trim(),
    } as Anime);

    if (!result) {
      setSaving(false);
      return;
    }

    if (coverFile) {
      try {
        await uploadCover(id, coverFile);
      } catch {
        setError('As informações foram salvas, mas a capa não. Tente a imagem de novo.');
        setSaving(false);
        return;
      }
    }

    if (refetch) refetch();
    navigate('/');
  };

  if (loading) {
    return <p>Carregando o anime...</p>;
  }

  return (
    <Form
      heading="Editar anime"
      submitLabel="Salvar alterações"
      saving={saving}
      title={title}
      description={description}
      releaseDate={releaseDate}
      completed={completed}
      type={type}
      ranking={ranking}
      coverPreview={coverPreview || (imageUrl.trim().startsWith('http') ? imageUrl.trim() : null)}
      coverUrl={imageUrl}
      canClearCover={Boolean(coverFile)}
      onTitleChange={(e) => setTitle(e.target.value)}
      onDescriptionChange={(e) => setDescription(e.target.value)}
      onReleaseDateChange={(e) => setReleaseDate(e.target.value)}
      onCompletedChange={() => setCompleted(!completed)}
      onTypeChange={(e) => setType(e.target.value as 'filme' | 'série')}
      onRankingChange={(e) => setRanking(e.target.value === '' ? undefined : Number(e.target.value))}
      onCoverSelect={onCoverSelect}
      onCoverUrlChange={setImageUrl}
      onSubmit={(e) => handleSubmit(e, submitAnime)}
      error={error ?? undefined}
    />
  );
};

export default UpdateAnimePage;
