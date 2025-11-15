'use client';

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
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { useGeneros, useArtistas } from '@/hooks/useCanciones';

interface CancionFiltersProps {
  genero: string;
  artista: string;
  añoMin: string;
  añoMax: string;
  onGeneroChange: (value: string) => void;
  onArtistaChange: (value: string) => void;
  onAñoMinChange: (value: string) => void;
  onAñoMaxChange: (value: string) => void;
  onClear: () => void;
}

export function CancionFilters({
  genero,
  artista,
  añoMin,
  añoMax,
  onGeneroChange,
  onArtistaChange,
  onAñoMinChange,
  onAñoMaxChange,
  onClear,
}: CancionFiltersProps) {
  const { data: generos } = useGeneros();
  const { data: artistas } = useArtistas();

  const hasFilters = genero || artista || añoMin || añoMax;

  return (
    <div className="bg-muted/50 p-4 rounded-lg space-y-4 mb-6">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Filtros</h3>
        {hasFilters && (
          <Button variant="ghost" size="sm" onClick={onClear}>
            <X className="h-4 w-4 mr-2" />
            Limpiar
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Select value={genero} onChange={(e) => onGeneroChange(e.target.value)}>
          <option value="">Todos los géneros</option>
          {generos?.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </Select>

        <Select value={artista} onChange={(e) => onArtistaChange(e.target.value)}>
          <option value="">Todos los artistas</option>
          {artistas?.map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </Select>

        <Input
          type="number"
          placeholder="Año mínimo"
          value={añoMin}
          onChange={(e) => onAñoMinChange(e.target.value)}
          min="1900"
          max="2030"
        />

        <Input
          type="number"
          placeholder="Año máximo"
          value={añoMax}
          onChange={(e) => onAñoMaxChange(e.target.value)}
          min="1900"
          max="2030"
        />
      </div>
    </div>
  );
}
