'use client';

import { useState } from 'react';
import { Pencil, Trash2, Plus, Search } from 'lucide-react';
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
import { UsuarioForm } from '@/components/usuarios/usuario-form';
import { useUsuarios, useSearchUsuarios } from '@/hooks/useUsuarios';
import { formatShortDate } from '@/utils/formatters';
import type { Usuario, UsuarioInput } from '@/types';
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

export default function UsuariosPage() {
  const [page, setPage] = useState(1);
  const [searchEmail, setSearchEmail] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingUsuario, setEditingUsuario] = useState<Usuario | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const limit = 10;
  const skip = (page - 1) * limit;

  const { query, createMutation, updateMutation, deleteMutation } = useUsuarios(
    skip,
    limit
  );
  const searchQuery = useSearchUsuarios(searchEmail);

  const displayData =
    searchEmail && searchQuery.data ? searchQuery.data : query.data?.items || [];
  const isSearching = searchEmail.length > 0;

  const handleCreate = async (data: UsuarioInput) => {
    await createMutation.mutateAsync(data);
    setIsCreateModalOpen(false);
  };

  const handleUpdate = async (data: UsuarioInput) => {
    if (editingUsuario) {
      await updateMutation.mutateAsync({ id: editingUsuario.id, data });
      setEditingUsuario(null);
    }
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
          <h1 className="text-4xl font-bold mb-2">Usuarios</h1>
          <p className="text-muted-foreground">
            Gestiona los usuarios de la plataforma
          </p>
        </div>

        <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por correo..."
              value={searchEmail}
              onChange={(e) => setSearchEmail(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button onClick={() => setIsCreateModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Nuevo Usuario
          </Button>
        </div>

        {query.isLoading && <LoadingSpinner />}

        {query.isError && (
          <ErrorMessage
            message="Error al cargar usuarios. Verifica que la API esté funcionando."
            onRetry={() => query.refetch()}
          />
        )}

        {!query.isLoading && !query.isError && displayData.length === 0 && (
          <EmptyState
            title={
              isSearching
                ? 'No se encontraron usuarios'
                : 'No hay usuarios registrados'
            }
            description={
              isSearching
                ? 'Intenta con otro correo electrónico'
                : 'Comienza creando tu primer usuario'
            }
            action={
              !isSearching
                ? {
                    label: 'Crear Usuario',
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
                    <TableHead>ID</TableHead>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Correo</TableHead>
                    <TableHead>Fecha de Registro</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {displayData.map((usuario) => (
                    <TableRow key={usuario.id}>
                      <TableCell className="font-medium">{usuario.id}</TableCell>
                      <TableCell>{usuario.nombre}</TableCell>
                      <TableCell>{usuario.correo}</TableCell>
                      <TableCell>
                        {formatShortDate(usuario.fecha_registro)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setEditingUsuario(usuario)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => setDeletingId(usuario.id)}
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
        title="Crear Usuario"
      >
        <UsuarioForm
          onSubmit={handleCreate}
          onCancel={() => setIsCreateModalOpen(false)}
          isSubmitting={createMutation.isPending}
        />
      </Modal>

      <Modal
        isOpen={!!editingUsuario}
        onClose={() => setEditingUsuario(null)}
        title="Editar Usuario"
      >
        <UsuarioForm
          usuario={editingUsuario || undefined}
          onSubmit={handleUpdate}
          onCancel={() => setEditingUsuario(null)}
          isSubmitting={updateMutation.isPending}
        />
      </Modal>

      <AlertDialog open={!!deletingId} onOpenChange={() => setDeletingId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. El usuario será eliminado
              permanentemente del sistema.
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
