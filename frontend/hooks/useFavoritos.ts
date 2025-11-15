import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { favoritosService } from '@/services/favoritos.service';
import { usuariosService } from '@/services/usuarios.service';
import { cancionesService } from '@/services/canciones.service';
import type { FavoritoInput } from '@/types';
import toast from 'react-hot-toast';

export function useFavoritos(skip = 0, limit = 10, userId?: number) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['favoritos', skip, limit, userId],
    queryFn: async () => {
      if (userId) {
        const items = await favoritosService.getByUser(userId);
        return {
          items,
          total: items.length,
          page: 1,
          size: items.length,
          pages: 1,
        };
      }
      return favoritosService.getAll(skip, limit);
    },
  });

  const createMutation = useMutation({
    mutationFn: (data: FavoritoInput) => favoritosService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favoritos'] });
      queryClient.invalidateQueries({ queryKey: ['favoritos-stats'] });
      toast.success('Favorito agregado exitosamente');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Error al agregar favorito');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => favoritosService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['favoritos'] });
      queryClient.invalidateQueries({ queryKey: ['favoritos-stats'] });
      toast.success('Favorito eliminado exitosamente');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Error al eliminar favorito');
    },
  });

  return {
    query,
    createMutation,
    deleteMutation,
  };
}

export function useUsuariosSelect() {
  return useQuery({
    queryKey: ['usuarios-all'],
    queryFn: async () => {
      const response = await usuariosService.getAll(0, 1000);
      return response.items;
    },
  });
}

export function useCancionesSelect() {
  return useQuery({
    queryKey: ['canciones-all'],
    queryFn: async () => {
      const response = await cancionesService.getAll({ skip: 0, limit: 1000 });
      return response.items;
    },
  });
}
