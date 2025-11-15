import { api } from '@/lib/api';
import type { Cancion, CancionInput, PaginatedResponse, Estadisticas } from '@/types';

interface CancionFilters {
  page?: number;
  size?: number;
  genero?: string;
  artista?: string;
  año_min?: number;
  año_max?: number;
}

export const cancionesService = {
  getAll: async (filters: CancionFilters = {}): Promise<PaginatedResponse<Cancion>> => {
    const { data } = await api.get<PaginatedResponse<Cancion>>('/api/canciones/', {
      params: { page: 1, size: 10, ...filters },
    });
    return data;
  },

  getById: async (id: number): Promise<Cancion> => {
    const { data } = await api.get<Cancion>(`/api/canciones/${id}`);
    return data;
  },

  create: async (cancion: CancionInput): Promise<Cancion> => {
    const { data } = await api.post<Cancion>('/api/canciones/', cancion);
    return data;
  },

  update: async (id: number, cancion: Partial<CancionInput>): Promise<Cancion> => {
    const { data } = await api.put<Cancion>(`/api/canciones/${id}`, cancion);
    return data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/api/canciones/${id}`);
  },

  searchAdvanced: async (titulo?: string, artista?: string): Promise<Cancion[]> => {
    const { data } = await api.get<Cancion[]>('/api/canciones/buscar/avanzada', {
      params: { titulo, artista },
    });
    return data;
  },

  getGenres: async (): Promise<string[]> => {
    const { data } = await api.get<string[]>('/api/canciones/generos/lista');
    return data;
  },

  getArtists: async (): Promise<string[]> => {
    const { data } = await api.get<string[]>('/api/canciones/artistas/lista');
    return data;
  },

  getStats: async (): Promise<Estadisticas> => {
    const { data } = await api.get<Estadisticas>('/api/canciones/estadisticas/resumen');
    return data;
  },
};
