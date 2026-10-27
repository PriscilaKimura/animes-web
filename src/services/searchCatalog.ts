import { API_URL } from '../config/api';
import { CatalogAnime } from '../types/catalog';

export async function searchCatalog(query: string): Promise<CatalogAnime[]> {
  const response = await fetch(
    `${API_URL}/catalog/anime?q=${encodeURIComponent(query.trim())}`,
  );
  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(
      body?.message ?? 'Não foi possível buscar no catálogo agora.',
    );
  }
  return response.json();
}
