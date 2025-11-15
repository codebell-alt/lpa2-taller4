import { api } from '@/lib/api';
import type { Favorito, FavoritoInput, PaginatedResponse, Estadisticas } from '@/types';

export const favoritosService = {
  getAll: async (skip = 0, limit = 10): Promise<PaginatedResponse<Favorito>> => {
    const { data } = await api.get<PaginatedResponse<Favorito>>('/api/favoritos/', {
      params: { skip, limit },
    });
    return data;
  },

  getById: async (id: number): Promise<Favorito> => {
    const { data } = await api.get<Favorito>(`/api/favoritos/${id}`);
    return data;
  },

  create: async (favorito: FavoritoInput): Promise<Favorito> => {
    const { data } = await api.post<Favorito>('/api/favoritos/', favorito);
    return data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/api/favoritos/${id}`);
  },

  getByUser: async (userId: number): Promise<Favorito[]> => {
    const { data } = await api.get<Favorito[]>(`/api/favoritos/usuario/${userId}`);
    return data;
  },

  addByUserAndSong: async (userId: number, cancionId: number): Promise<Favorito> => {
    const { data } = await api.post<Favorito>(
      `/api/favoritos/usuario/${userId}/cancion/${cancionId}`
    );
    return data;
  },

  removeByUserAndSong: async (userId: number, cancionId: number): Promise<void> => {
    await api.delete(`/api/favoritos/usuario/${userId}/cancion/${cancionId}`);
  },

  verify: async (userId: number, cancionId: number): Promise<boolean> => {
    try {
      const { data } = await api.get<{ es_favorito: boolean }>(
        `/api/favoritos/verificar/${userId}/${cancionId}`
      );
      return data.es_favorito;
    } catch {
      return false;
    }
  },

  getStats: async (): Promise<Estadisticas> => {
    const { data } = await api.get<Estadisticas>('/api/favoritos/estadisticas/resumen');
    return data;
  },
};
