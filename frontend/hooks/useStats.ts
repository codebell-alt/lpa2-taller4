import { useQuery } from '@tanstack/react-query';
import { usuariosService } from '@/services/usuarios.service';
import { cancionesService } from '@/services/canciones.service';
import { favoritosService } from '@/services/favoritos.service';

export function useStats() {
  const usuarios = useQuery({
    queryKey: ['usuarios-stats'],
    queryFn: () => usuariosService.getStats(),
  });

  const canciones = useQuery({
    queryKey: ['canciones-stats'],
    queryFn: () => cancionesService.getStats(),
  });

  const favoritos = useQuery({
    queryKey: ['favoritos-stats'],
    queryFn: () => favoritosService.getStats(),
  });

  return {
    usuarios,
    canciones,
    favoritos,
    isLoading: usuarios.isLoading || canciones.isLoading || favoritos.isLoading,
    isError: usuarios.isError || canciones.isError || favoritos.isError,
  };
}
