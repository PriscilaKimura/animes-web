export interface CatalogAnime {
  externalId: string;
  title: string;
  description: string;
  releaseDate?: string;
  type: 'filme' | 'série';
  imageUrl?: string;
  ranking?: number;
}
