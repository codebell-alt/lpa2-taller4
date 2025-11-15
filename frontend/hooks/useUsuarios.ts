import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { usuariosService } from '@/services/usuarios.service';
import type { UsuarioInput } from '@/types';
import toast from 'react-hot-toast';

export function useUsuarios(skip = 0, limit = 10) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ['usuarios', skip, limit],
    queryFn: () => usuariosService.getAll(skip, limit),
  });

  const createMutation = useMutation({
    mutationFn: (data: UsuarioInput) => usuariosService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['usuarios'] });
      queryClient.invalidateQueries({ queryKey: ['usuarios-stats'] });
      toast.success('Usuario creado exitosamente');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Error al crear usuario');
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<UsuarioInput> }) =>
      usuariosService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['usuarios'] });
      toast.success('Usuario actualizado exitosamente');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Error al actualizar usuario');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => usuariosService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['usuarios'] });
      queryClient.invalidateQueries({ queryKey: ['usuarios-stats'] });
      toast.success('Usuario eliminado exitosamente');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.detail || 'Error al eliminar usuario');
    },
  });

  return {
    query,
    createMutation,
    updateMutation,
    deleteMutation,
  };
}

export function useSearchUsuarios(correo: string) {
  return useQuery({
    queryKey: ['usuarios-search', correo],
    queryFn: () => usuariosService.searchByEmail(correo),
    enabled: correo.length > 0,
  });
}
