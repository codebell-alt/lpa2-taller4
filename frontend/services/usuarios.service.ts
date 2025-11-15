import { api } from '@/lib/api';
import type { Usuario, UsuarioInput, PaginatedResponse, Estadisticas } from '@/types';

export const usuariosService = {
  getAll: async (skip = 0, limit = 10): Promise<PaginatedResponse<Usuario>> => {
    const { data } = await api.get<PaginatedResponse<Usuario>>('/api/usuarios/', {
      params: { skip, limit },
    });
    return data;
  },

  getById: async (id: number): Promise<Usuario> => {
    const { data } = await api.get<Usuario>(`/api/usuarios/${id}`);
    return data;
  },

  create: async (usuario: UsuarioInput): Promise<Usuario> => {
    const { data } = await api.post<Usuario>('/api/usuarios/', usuario);
    return data;
  },

  update: async (id: number, usuario: Partial<UsuarioInput>): Promise<Usuario> => {
    const { data } = await api.put<Usuario>(`/api/usuarios/${id}`, usuario);
    return data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/api/usuarios/${id}`);
  },

  searchByEmail: async (correo: string): Promise<Usuario[]> => {
    const { data } = await api.get<Usuario[]>('/api/usuarios/buscar/por-correo', {
      params: { correo },
    });
    return data;
  },

  getStats: async (): Promise<Estadisticas> => {
    const { data } = await api.get<Estadisticas>('/api/usuarios/estadisticas/resumen');
    return data;
  },
};
