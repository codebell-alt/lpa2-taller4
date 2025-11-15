'use client';

import { useState } from 'react';
import { Pencil, Trash2, Plus, Search, Filter } from 'lucide-react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Modal } from '@/components/ui/modal';
import { LoadingSpinner } from '@/components/ui/spinner';
import { ErrorMessage } from '@/components/ui/error-message';
import { EmptyState } from '@/components/ui/empty-state';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationEllipsis,
  PaginationPrevious,
  PaginationNext
} from '@/components/ui/pagination';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { CancionForm } from '@/components/canciones/cancion-form';
import { CancionFilters } from '@/components/canciones/cancion-filters';
import { useCanciones, useSearchCanciones } from '@/hooks/useCanciones';
import { formatDuration } from '@/utils/formatters';
import type { Cancion, CancionInput } from '@/types';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

export default function CancionesPage() {
  const [page, setPage] = useState(1);
  const [searchTitulo, setSearchTitulo] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    genero: '',
    artista: '',
    año_min: '',
    año_max: '',
  });
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingCancion, setEditingCancion] = useState<Cancion | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const limit = 10;
  const skip = (page - 1) * limit;

  const queryFilters = {
    skip,
    limit,
    ...(filters.genero && { genero: filters.genero }),
    ...(filters.artista && { artista: filters.artista }),
    ...(filters.año_min && { año_min: parseInt(filters.año_min) }),
    ...(filters.año_max && { año_max: parseInt(filters.año_max) }),
  };

  const { query, createMutation, updateMutation, deleteMutation } =
    useCanciones(queryFilters);
  const searchQuery = useSearchCanciones(searchTitulo, undefined);

  const displayData =
    searchTitulo && searchQuery.data ? searchQuery.data : query.data?.items || [];
  const isSearching = searchTitulo.length > 0;

  const handleCreate = async (data: CancionInput) => {
    await createMutation.mutateAsync(data);
    setIsCreateModalOpen(false);
  };

  const handleUpdate = async (data: CancionInput) => {
    if (editingCancion) {
      await updateMutation.mutateAsync({ id: editingCancion.id, data });
      setEditingCancion(null);
    }
  };

  const handleDelete = async () => {
    if (deletingId) {
      await deleteMutation.mutateAsync(deletingId);
      setDeletingId(null);
    }
  };

  const clearFilters = () => {
    setFilters({
      genero: '',
      artista: '',
      año_min: '',
      año_max: '',
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Canciones</h1>
          <p className="text-muted-foreground">
            Administra tu catálogo musical completo
          </p>
        </div>

        <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por título..."
              value={searchTitulo}
              onChange={(e) => setSearchTitulo(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filtros
            </Button>
            <Button onClick={() => setIsCreateModalOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Nueva Canción
            </Button>
          </div>
        </div>

        {showFilters && (
          <CancionFilters
            genero={filters.genero}
            artista={filters.artista}
            añoMin={filters.año_min}
            añoMax={filters.año_max}
            onGeneroChange={(value) =>
              setFilters({ ...filters, genero: value })
            }
            onArtistaChange={(value) =>
              setFilters({ ...filters, artista: value })
            }
            onAñoMinChange={(value) =>
              setFilters({ ...filters, año_min: value })
            }
            onAñoMaxChange={(value) =>
              setFilters({ ...filters, año_max: value })
            }
            onClear={clearFilters}
          />
        )}

        {query.isLoading && <LoadingSpinner />}

        {query.isError && (
          <ErrorMessage
            message="Error al cargar canciones. Verifica que la API esté funcionando."
            onRetry={() => query.refetch()}
          />
        )}

        {!query.isLoading && !query.isError && displayData.length === 0 && (
          <EmptyState
            title={
              isSearching
                ? 'No se encontraron canciones'
                : 'No hay canciones registradas'
            }
            description={
              isSearching
                ? 'Intenta con otro término de búsqueda'
                : 'Comienza agregando tu primera canción'
            }
            action={
              !isSearching
                ? {
                    label: 'Agregar Canción',
                    onClick: () => setIsCreateModalOpen(true),
                  }
                : undefined
            }
          />
        )}

        {!query.isLoading && !query.isError && displayData.length > 0 && (
          <>
            <div className="border rounded-lg">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Título</TableHead>
                    <TableHead>Artista</TableHead>
                    <TableHead>Álbum</TableHead>
                    <TableHead>Duración</TableHead>
                    <TableHead>Año</TableHead>
                    <TableHead>Género</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {displayData.map((cancion) => (
                    <TableRow key={cancion.id}>
                      <TableCell className="font-medium">
                        {cancion.titulo}
                      </TableCell>
                      <TableCell>{cancion.artista}</TableCell>
                      <TableCell>{cancion.album}</TableCell>
                      <TableCell>{formatDuration(cancion.duracion)}</TableCell>
                      <TableCell>{cancion.año}</TableCell>
                      <TableCell>
                        <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs">
                          {cancion.genero}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setEditingCancion(cancion)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => setDeletingId(cancion.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {!isSearching && query.data && (
              <Pagination
                currentPage={page}
                totalPages={query.data.pages}
                onPageChange={setPage}
              />
            )}
          </>
        )}
      </main>

      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Crear Canción"
        size="lg"
      >
        <CancionForm
          onSubmit={handleCreate}
          onCancel={() => setIsCreateModalOpen(false)}
          isSubmitting={createMutation.isPending}
        />
      </Modal>

      <Modal
        isOpen={!!editingCancion}
        onClose={() => setEditingCancion(null)}
        title="Editar Canción"
        size="lg"
      >
        <CancionForm
          cancion={editingCancion || undefined}
          onSubmit={handleUpdate}
          onCancel={() => setEditingCancion(null)}
          isSubmitting={updateMutation.isPending}
        />
      </Modal>

      <AlertDialog open={!!deletingId} onOpenChange={() => setDeletingId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. La canción será eliminada
              permanentemente del catálogo.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Footer />
    </div>
  );
}
