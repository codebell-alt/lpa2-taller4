import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { favoritosService } from '@/services/favoritos.service';
import { usuariosService } from '@/services/usuarios.service';
import { cancionesService } from '@/services/canciones.service';
import type { FavoritoInput } from '@/types';
import toast from 'react-hot-toast';

export function useFavoritos(page = 1, size = 10, userId?: number) {
  const queryClient = useQueryClient();

  // Obtener todos los favoritos con paginación
  const favoritos = useQuery({
    queryKey: ['favoritos', page, size, userId],
    queryFn: async () => {
      // Si se proporciona userId, obtener favoritos específicos del usuario
      if (userId) {
        try {
          const favoritos = await favoritosService.getByUser(userId);
          // Convertir array a formato paginado
          return {
            items: favoritos,
            total: favoritos.length,
            page: 1,
            size: favoritos.length,
            pages: 1
          };
        } catch (error) {
          console.error('Error al obtener favoritos del usuario:', error);
          throw error;
        }
      }
      return favoritosService.getAll(page, size);
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
    favoritos,
    createMutation,
    deleteMutation,
  };
}

export function useUsuariosSelect() {
  return useQuery({
    queryKey: ['usuarios-all'],
    queryFn: async () => {
      const response = await usuariosService.getAll(1, 1000);
      return response.items;
    },
  });
}

export function useCancionesSelect() {
  return useQuery({
    queryKey: ['canciones-all'],
    queryFn: async () => {
      const response = await cancionesService.getAll({ page: 1, size: 1000 });
      return response.items;
    },
  });
}
