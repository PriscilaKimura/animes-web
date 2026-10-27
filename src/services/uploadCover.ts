import { API_URL } from '../config/api';

export async function uploadCover(id: string, file: File): Promise<void> {
  const body = new FormData();
  body.append('file', file);
  const response = await fetch(`${API_URL}/anime/${id}/cover`, {
    method: 'POST',
    body,
  });
  if (!response.ok) {
    throw new Error('Não foi possível salvar a capa.');
  }
}
