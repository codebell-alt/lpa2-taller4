'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectGroup,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton
} from '@/components/ui/select';
import { useUsuariosSelect, useCancionesSelect } from '@/hooks/useFavoritos';

const favoritoSchema = z.object({
  id_usuario: z.number().positive('Selecciona un usuario'),
  id_cancion: z.number().positive('Selecciona una canción'),
});

type FavoritoFormData = z.infer<typeof favoritoSchema>;

interface FavoritoFormProps {
  onSubmit: (data: FavoritoFormData) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export function FavoritoForm({
  onSubmit,
  onCancel,
  isSubmitting,
}: FavoritoFormProps) {
  const { data: usuarios, isLoading: loadingUsuarios } = useUsuariosSelect();
  const { data: canciones, isLoading: loadingCanciones } = useCancionesSelect();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FavoritoFormData>({
    resolver: zodResolver(favoritoSchema),
    defaultValues: {
      id_usuario: 0,
      id_cancion: 0,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="id_usuario">Usuario</Label>
        <Select
          id="id_usuario"
          {...register('id_usuario', { valueAsNumber: true })}
          disabled={loadingUsuarios}
          className="mt-1"
        >
          <option value={0}>Selecciona un usuario</option>
          {usuarios?.map((usuario) => (
            <option key={usuario.id} value={usuario.id}>
              {usuario.nombre} ({usuario.correo})
            </option>
          ))}
        </Select>
        {errors.id_usuario && (
          <p className="text-sm text-destructive mt-1">
            {errors.id_usuario.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="id_cancion">Canción</Label>
        <Select
          id="id_cancion"
          {...register('id_cancion', { valueAsNumber: true })}
          disabled={loadingCanciones}
          className="mt-1"
        >
          <option value={0}>Selecciona una canción</option>
          {canciones?.map((cancion) => (
            <option key={cancion.id} value={cancion.id}>
              {cancion.titulo} - {cancion.artista}
            </option>
          ))}
        </Select>
        {errors.id_cancion && (
          <p className="text-sm text-destructive mt-1">
            {errors.id_cancion.message}
          </p>
        )}
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Agregando...' : 'Agregar Favorito'}
        </Button>
      </div>
    </form>
  );
}
