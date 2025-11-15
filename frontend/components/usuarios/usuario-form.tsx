'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { Usuario } from '@/types';

const usuarioSchema = z.object({
  nombre: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'El nombre no puede exceder 100 caracteres'),
  correo: z
    .string()
    .email('Debe ser un correo electrónico válido')
    .min(1, 'El correo es requerido'),
});

type UsuarioFormData = z.infer<typeof usuarioSchema>;

interface UsuarioFormProps {
  usuario?: Usuario;
  onSubmit: (data: UsuarioFormData) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export function UsuarioForm({
  usuario,
  onSubmit,
  onCancel,
  isSubmitting,
}: UsuarioFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UsuarioFormData>({
    resolver: zodResolver(usuarioSchema),
    defaultValues: {
      nombre: usuario?.nombre || '',
      correo: usuario?.correo || '',
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <Label htmlFor="nombre">Nombre</Label>
        <Input
          id="nombre"
          {...register('nombre')}
          placeholder="Ingresa el nombre"
          className="mt-1"
        />
        {errors.nombre && (
          <p className="text-sm text-destructive mt-1">{errors.nombre.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="correo">Correo Electrónico</Label>
        <Input
          id="correo"
          type="email"
          {...register('correo')}
          placeholder="usuario@ejemplo.com"
          className="mt-1"
        />
        {errors.correo && (
          <p className="text-sm text-destructive mt-1">{errors.correo.message}</p>
        )}
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Guardando...' : usuario ? 'Actualizar' : 'Crear'}
        </Button>
      </div>
    </form>
  );
}
