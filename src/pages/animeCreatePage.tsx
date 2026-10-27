import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAnimeForm from '../hooks/useFormAnime';
import { Anime } from '../types/interface';
import { CatalogAnime } from '../types/catalog';
import { API_URL } from '../config/api';
import Form from '../components/form/form';
import CatalogSearch from '../components/catalogSearch/catalogSearch';
import { uploadCover } from '../services/uploadCover';

const CreateAnimePage: React.FC = () => {
  const navigate = useNavigate();
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
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const onCoverSelect = (file: File | null) => {
    setCoverPreview((current) => {
      if (current?.startsWith('blob:')) URL.revokeObjectURL(current);
      return file ? URL.createObjectURL(file) : null;
    });
    setCoverFile(file);
  };

  const onCatalogSelect = (anime: CatalogAnime) => {
    setTitle(anime.title);
    setDescription(anime.description);
    setReleaseDate(anime.releaseDate ?? '');
    setType(anime.type);
    setRanking(anime.ranking);
    setImageUrl(anime.imageUrl ?? '');
    setCoverFile(null);
    setCoverPreview((current) => {
      if (current?.startsWith('blob:')) URL.revokeObjectURL(current);
      return null;
    });
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  const submitAnime = async (anime: Partial<Anime>) => {
    setSaving(true);
    setError(null);
    try {
      const response = await fetch(`${API_URL}/anime`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(anime),
      });
      if (!response.ok) {
        throw new Error('Não foi possível salvar. Confira a data e o ranking de 0 a 10.');
      }
      const created: Anime = await response.json();
      if (coverFile) {
        try {
          await uploadCover(created.id, coverFile);
        } catch {
          navigate(`/update/${created.id}`, { state: { coverError: true } });
          return;
        }
      }
      navigate('/', { state: { created: true } });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Não foi possível salvar o anime.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <CatalogSearch onSelect={onCatalogSelect} />
      <Form
        heading="Adicionar um anime"
        submitLabel="Salvar anime"
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
    </>
  );
};

export default CreateAnimePage;
