'use client';

import { useState } from 'react';
import { Trash2, Plus, Heart, Filter, X } from 'lucide-react';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Button } from '@/components/ui/button';
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
import { FavoritoForm } from '@/components/favoritos/favorito-form';
import { useFavoritos, useUsuariosSelect } from '@/hooks/useFavoritos';
import { formatShortDate, formatDuration } from '@/utils/formatters';
import type { FavoritoInput } from '@/types';
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

export default function FavoritosPage() {
  const [page, setPage] = useState(1);
  const [userFilter, setUserFilter] = useState<number | undefined>(undefined);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const size = 10;

  const { favoritos, createMutation, deleteMutation } = useFavoritos(
    page,
    size,
    userFilter
  );
  const { data: usuarios } = useUsuariosSelect();

  const handleCreate = async (data: FavoritoInput) => {
    await createMutation.mutateAsync(data);
    setIsCreateModalOpen(false);
  };

  const handleDelete = async () => {
    if (deletingId) {
      await deleteMutation.mutateAsync(deletingId);
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Favoritos</h1>
          <p className="text-muted-foreground">
            Explora las canciones favoritas de los usuarios
          </p>
        </div>

        <div className="mb-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
            <div className="w-full sm:w-64">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select
                  value={userFilter?.toString() || ''}
                  onChange={(e) =>
                    setUserFilter(
                      e.target.value ? parseInt(e.target.value) : undefined
                    )
                  }
                  className="flex-1"
                >
                  <option value="">Todos los usuarios</option>
                  {usuarios?.map((usuario) => (
                    <option key={usuario.id} value={usuario.id}>
                      {usuario.nombre}
                    </option>
                  ))}
                </Select>
                {userFilter && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setUserFilter(undefined)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
            <Button onClick={() => setIsCreateModalOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Agregar Favorito
            </Button>
          </div>
        </div>

        {favoritos.isLoading && <LoadingSpinner />}

        {favoritos.isError && (
          <ErrorMessage
            message="Error al cargar favoritos. Verifica que la API esté funcionando."
            onRetry={() => favoritos.refetch()}
          />
        )}

        {!favoritos.isLoading &&
          !favoritos.isError &&
          (favoritos.data?.items.length || 0) === 0 && (
            <EmptyState
              title={
                userFilter
                  ? 'Este usuario no tiene favoritos'
                  : 'No hay favoritos registrados'
              }
              description={
                userFilter
                  ? 'Agrega canciones a los favoritos de este usuario'
                  : 'Comienza agregando canciones favoritas para los usuarios'
              }
              icon={<Heart className="h-16 w-16" />}
              action={{
                label: 'Agregar Favorito',
                onClick: () => setIsCreateModalOpen(true),
              }}
            />
          )}

        {!favoritos.isLoading &&
          !favoritos.isError &&
          (favoritos.data?.items.length || 0) > 0 && (
            <>
              <div className="border rounded-lg">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Usuario</TableHead>
                      <TableHead>Canción</TableHead>
                      <TableHead>Artista</TableHead>
                      <TableHead>Álbum</TableHead>
                      <TableHead>Duración</TableHead>
                      <TableHead>Fecha</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {favoritos.data?.items.map((favorito) => (
                      <TableRow key={favorito.id}>
                        <TableCell className="font-medium">
                          {favorito.usuario?.nombre || `Usuario #${favorito.id_usuario}`}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Heart className="h-4 w-4 text-red-500 fill-red-500" />
                            {favorito.cancion?.titulo || `Canción #${favorito.id_cancion}`}
                          </div>
                        </TableCell>
                        <TableCell>
                          {favorito.cancion?.artista || '-'}
                        </TableCell>
                        <TableCell>
                          {favorito.cancion?.album || '-'}
                        </TableCell>
                        <TableCell>
                          {favorito.cancion
                            ? formatDuration(favorito.cancion.duracion)
                            : '-'}
                        </TableCell>
                        <TableCell>
                          {formatShortDate(favorito.fecha_marcado)}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => setDeletingId(favorito.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {!userFilter && favoritos.data && (
                <Pagination
                  currentPage={page}
                  totalPages={favoritos.data.pages}
                  onPageChange={setPage}
                />
              )}
            </>
          )}
      </main>

      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Agregar Favorito"
      >
        <FavoritoForm
          onSubmit={handleCreate}
          onCancel={() => setIsCreateModalOpen(false)}
          isSubmitting={createMutation.isPending}
        />
      </Modal>

      <AlertDialog open={!!deletingId} onOpenChange={() => setDeletingId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción eliminará el favorito de la lista del usuario.
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
