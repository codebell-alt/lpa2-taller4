import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { cancionesService } from '@/services/canciones.service';
import type { CancionInput } from '@/types';
import toast from 'react-hot-toast';

interface CancionFilters {
  page?: number;
  size?: number;
  genero?: string;
  artista?: string;
  año_min?: number;
  año_max?: number;
}

type UseCancionesFilters = CancionFilters;

export function useCanciones(filters: UseCancionesFilters = {}) {
  const queryClient = useQueryClient();

  const canciones = useQuery({
    queryKey: ['canciones', filters],
    queryFn: () => cancionesService.getAll(filters),
  });

  const createMutation = useMutation({
    mutationFn: (data: CancionInput) => cancionesService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['canciones'] });
      queryClient.invalidateQueries({ queryKey: ['canciones-stats'] });
      toast.success('Canción creada exitosamente');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Error al crear canción');
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<CancionInput> }) =>
      cancionesService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['canciones'] });
      toast.success('Canción actualizada exitosamente');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Error al actualizar canción');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => cancionesService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['canciones'] });
      queryClient.invalidateQueries({ queryKey: ['canciones-stats'] });
      toast.success('Canción eliminada exitosamente');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Error al eliminar canción');
    },
  });

  return {
    canciones,
    createMutation,
    updateMutation,
    deleteMutation,
  };
}

export function useGeneros() {
  return useQuery({
    queryKey: ['generos'],
    queryFn: () => cancionesService.getGenres(),
  });
}

export function useArtistas() {
  return useQuery({
    queryKey: ['artistas'],
    queryFn: () => cancionesService.getArtists(),
  });
}

export function useSearchCanciones(titulo?: string, artista?: string) {
  return useQuery({
    queryKey: ['canciones-search', titulo, artista],
    queryFn: () => cancionesService.searchAdvanced(titulo, artista),
    enabled: !!titulo || !!artista,
  });
}
