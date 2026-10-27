import React, { useEffect, useState } from 'react';
import { CatalogAnime } from '../../types/catalog';
import { searchCatalog } from '../../services/searchCatalog';
import {
  ResultButton,
  ResultCover,
  ResultInfo,
  ResultItem,
  ResultsList,
  SearchBox,
  SearchError,
  SearchHint,
  SearchInput,
  SearchTitle,
} from './catalogSearchStyled';

interface CatalogSearchProps {
  onSelect: (anime: CatalogAnime) => void;
}

const CatalogSearch: React.FC<CatalogSearchProps> = ({ onSelect }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<CatalogAnime[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const term = query.trim();
    if (term.length < 2) {
      setResults([]);
      setError(null);
      setLoading(false);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await searchCatalog(term);
        setResults(data);
      } catch (err) {
        setResults([]);
        setError(err instanceof Error ? err.message : 'Falha na busca.');
      } finally {
        setLoading(false);
      }
    }, 450);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <SearchBox>
      <SearchTitle>Buscar no catálogo</SearchTitle>
      <SearchHint>
        Digite o nome do anime. Os dados e a capa vêm da AniList, sem custo.
        Se não achar, preencha o formulário abaixo na mão.
      </SearchHint>
      <SearchInput
        type="search"
        value={query}
        placeholder="Ex.: Cowboy Bebop"
        onChange={(event) => setQuery(event.target.value)}
      />
      {loading && <SearchHint>Buscando...</SearchHint>}
      {error && <SearchError>{error}</SearchError>}
      {results.length > 0 && (
        <ResultsList>
          {results.map((anime) => (
            <ResultItem key={anime.externalId}>
              {anime.imageUrl ? (
                <ResultCover src={anime.imageUrl} alt="" />
              ) : (
                <ResultCover as="div" />
              )}
              <ResultInfo>
                <strong>{anime.title}</strong>
                <span>
                  {anime.type === 'filme' ? 'Filme' : 'Série'}
                  {anime.releaseDate ? ` · ${anime.releaseDate.slice(0, 4)}` : ''}
                </span>
              </ResultInfo>
              <ResultButton type="button" onClick={() => onSelect(anime)}>
                Usar este
              </ResultButton>
            </ResultItem>
          ))}
        </ResultsList>
      )}
      {!loading && !error && query.trim().length >= 2 && results.length === 0 && (
        <SearchHint>Nenhum resultado. Preencha o formulário abaixo.</SearchHint>
      )}
    </SearchBox>
  );
};

export default CatalogSearch;
