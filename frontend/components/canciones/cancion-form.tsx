'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { Cancion } from '@/types';

const cancionSchema = z.object({
  titulo: z
    .string()
    .min(1, 'El título es requerido')
    .max(200, 'El título no puede exceder 200 caracteres'),
  artista: z
    .string()
    .min(1, 'El artista es requerido')
    .max(100, 'El artista no puede exceder 100 caracteres'),
  album: z
    .string()
    .min(1, 'El álbum es requerido')
    .max(200, 'El álbum no puede exceder 200 caracteres'),
  duracion: z
    .number()
    .positive('La duración debe ser positiva')
    .max(7200, 'La duración no puede exceder 7200 segundos'),
  año: z
    .number()
    .min(1900, 'El año debe ser mayor a 1900')
    .max(2030, 'El año no puede ser mayor a 2030'),
  genero: z
    .string()
    .min(1, 'El género es requerido')
    .max(50, 'El género no puede exceder 50 caracteres'),
});

type CancionFormData = z.infer<typeof cancionSchema>;

interface CancionFormProps {
  cancion?: Cancion;
  onSubmit: (data: CancionFormData) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export function CancionForm({
  cancion,
  onSubmit,
  onCancel,
  isSubmitting,
}: CancionFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CancionFormData>({
    resolver: zodResolver(cancionSchema),
    defaultValues: {
      titulo: cancion?.titulo || '',
      artista: cancion?.artista || '',
      album: cancion?.album || '',
      duracion: cancion?.duracion || 0,
      año: cancion?.año || new Date().getFullYear(),
      genero: cancion?.genero || '',
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="titulo">Título</Label>
          <Input
            id="titulo"
            {...register('titulo')}
            placeholder="Nombre de la canción"
            className="mt-1"
          />
          {errors.titulo && (
            <p className="text-sm text-destructive mt-1">{errors.titulo.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="artista">Artista</Label>
          <Input
            id="artista"
            {...register('artista')}
            placeholder="Nombre del artista"
            className="mt-1"
          />
          {errors.artista && (
            <p className="text-sm text-destructive mt-1">{errors.artista.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="album">Álbum</Label>
          <Input
            id="album"
            {...register('album')}
            placeholder="Nombre del álbum"
            className="mt-1"
          />
          {errors.album && (
            <p className="text-sm text-destructive mt-1">{errors.album.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="genero">Género</Label>
          <Input
            id="genero"
            {...register('genero')}
            placeholder="Rock, Pop, Jazz..."
            className="mt-1"
          />
          {errors.genero && (
            <p className="text-sm text-destructive mt-1">{errors.genero.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="duracion">Duración (segundos)</Label>
          <Input
            id="duracion"
            type="number"
            {...register('duracion', { valueAsNumber: true })}
            placeholder="180"
            className="mt-1"
          />
          {errors.duracion && (
            <p className="text-sm text-destructive mt-1">{errors.duracion.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="año">Año</Label>
          <Input
            id="año"
            type="number"
            {...register('año', { valueAsNumber: true })}
            placeholder="2024"
            className="mt-1"
          />
          {errors.año && (
            <p className="text-sm text-destructive mt-1">{errors.año.message}</p>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Guardando...' : cancion ? 'Actualizar' : 'Crear'}
        </Button>
      </div>
    </form>
  );
}
