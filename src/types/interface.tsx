export interface Anime {
    id: string;
    title: string;
    description: string;
    releaseDate: string;
    completed: boolean;
    type: 'filme' | 'série';
    imageUrl?: string; 
  }
  