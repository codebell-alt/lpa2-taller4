'use client';

import { Users, Music, Heart, TrendingUp, Calendar, Award } from 'lucide-react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { StatCard } from '@/components/ui/stat-card';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/ui/spinner';
import { ErrorMessage } from '@/components/ui/error-message';
import { useStats } from '@/hooks/useStats';

export default function DashboardPage() {
  const { usuarios, canciones, favoritos, isLoading, isError } = useStats();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-muted-foreground">
            Gestiona tu biblioteca musical de forma eficiente
          </p>
        </div>

        {isLoading && <LoadingSpinner message="Cargando estadísticas..." />}

        {isError && (
          <ErrorMessage
            message="No se pudieron cargar las estadísticas. Verifica que la API esté funcionando."
            onRetry={() => {
              usuarios.refetch();
              canciones.refetch();
              favoritos.refetch();
            }}
          />
        )}

        {!isLoading && !isError && (
          <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
              <StatCard
                title="Total Usuarios"
                value={(usuarios.data as any)?.total_usuarios || 0}
                icon={Users}
                gradient="bg-gradient-to-br from-blue-500/10 to-purple-500/10"
              />
              <StatCard
                title="Total Canciones"
                value={(canciones.data as any)?.total_canciones || 0}
                icon={Music}
                gradient="bg-gradient-to-br from-purple-500/10 to-pink-500/10"
              />
              <StatCard
                title="Total Favoritos"
                value={(favoritos.data as any)?.total_favoritos || 0}
                icon={Heart}
                gradient="bg-gradient-to-br from-pink-500/10 to-red-500/10"
              />
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Users className="h-8 w-8 text-primary" />
                    <TrendingUp className="h-5 w-5 text-green-500" />
                  </div>
                  <CardTitle className="mt-4">Usuarios</CardTitle>
                  <CardDescription>
                    Gestiona los usuarios de tu plataforma
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/usuarios">
                    <Button className="w-full">Ver Usuarios</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Music className="h-8 w-8 text-primary" />
                    <Award className="h-5 w-5 text-yellow-500" />
                  </div>
                  <CardTitle className="mt-4">Canciones</CardTitle>
                  <CardDescription>
                    Administra tu catálogo musical completo
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/canciones">
                    <Button className="w-full">Ver Canciones</Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Heart className="h-8 w-8 text-primary" />
                    <Calendar className="h-5 w-5 text-blue-500" />
                  </div>
                  <CardTitle className="mt-4">Favoritos</CardTitle>
                  <CardDescription>
                    Explora las canciones favoritas de usuarios
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/favoritos">
                    <Button className="w-full">Ver Favoritos</Button>
                  </Link>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
              <CardHeader>
                <CardTitle>Comienza a explorar</CardTitle>
                <CardDescription>
                  Accede rápidamente a las funcionalidades principales del sistema
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <Link href="/usuarios">
                    <Button variant="outline" className="w-full">
                      Crear Usuario
                    </Button>
                  </Link>
                  <Link href="/canciones">
                    <Button variant="outline" className="w-full">
                      Agregar Canción
                    </Button>
                  </Link>
                  <Link href="/favoritos">
                    <Button variant="outline" className="w-full">
                      Marcar Favorito
                    </Button>
                  </Link>
                  <Link href="/docs">
                    <Button variant="outline" className="w-full">
                      Ver Documentación
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
