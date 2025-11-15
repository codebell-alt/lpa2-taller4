'use client';

import { FileText, ExternalLink, Code, Database, Users, Music, Heart } from 'lucide-react';
import Link from 'next/link';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { API_BASE_URL } from '@/lib/api';

const endpoints = [
  {
    category: 'Usuarios',
    icon: Users,
    routes: [
      { method: 'GET', path: '/api/usuarios/', description: 'Listar usuarios (paginado)' },
      { method: 'POST', path: '/api/usuarios/', description: 'Crear usuario' },
      { method: 'GET', path: '/api/usuarios/{id}', description: 'Obtener usuario por ID' },
      { method: 'PUT', path: '/api/usuarios/{id}', description: 'Actualizar usuario' },
      { method: 'DELETE', path: '/api/usuarios/{id}', description: 'Eliminar usuario' },
      { method: 'GET', path: '/api/usuarios/buscar/por-correo', description: 'Buscar por correo' },
      { method: 'GET', path: '/api/usuarios/estadisticas/resumen', description: 'Estadísticas' },
    ],
  },
  {
    category: 'Canciones',
    icon: Music,
    routes: [
      { method: 'GET', path: '/api/canciones/', description: 'Listar canciones (con filtros)' },
      { method: 'POST', path: '/api/canciones/', description: 'Crear canción' },
      { method: 'GET', path: '/api/canciones/{id}', description: 'Obtener canción por ID' },
      { method: 'PUT', path: '/api/canciones/{id}', description: 'Actualizar canción' },
      { method: 'DELETE', path: '/api/canciones/{id}', description: 'Eliminar canción' },
      { method: 'GET', path: '/api/canciones/buscar/avanzada', description: 'Búsqueda avanzada' },
      { method: 'GET', path: '/api/canciones/generos/lista', description: 'Listar géneros' },
      { method: 'GET', path: '/api/canciones/artistas/lista', description: 'Listar artistas' },
      { method: 'GET', path: '/api/canciones/estadisticas/resumen', description: 'Estadísticas' },
    ],
  },
  {
    category: 'Favoritos',
    icon: Heart,
    routes: [
      { method: 'GET', path: '/api/favoritos/', description: 'Listar favoritos (paginado)' },
      { method: 'POST', path: '/api/favoritos/', description: 'Crear favorito' },
      { method: 'GET', path: '/api/favoritos/{id}', description: 'Obtener favorito por ID' },
      { method: 'DELETE', path: '/api/favoritos/{id}', description: 'Eliminar favorito' },
      { method: 'GET', path: '/api/favoritos/usuario/{usuario_id}', description: 'Favoritos por usuario' },
      { method: 'POST', path: '/api/favoritos/usuario/{usuario_id}/cancion/{cancion_id}', description: 'Agregar favorito' },
      { method: 'DELETE', path: '/api/favoritos/usuario/{usuario_id}/cancion/{cancion_id}', description: 'Quitar favorito' },
      { method: 'GET', path: '/api/favoritos/verificar/{usuario_id}/{cancion_id}', description: 'Verificar favorito' },
      { method: 'GET', path: '/api/favoritos/estadisticas/resumen', description: 'Estadísticas' },
    ],
  },
];

const methodColors: Record<string, string> = {
  GET: 'bg-blue-500/10 text-blue-600 border-blue-500/20',
  POST: 'bg-green-500/10 text-green-600 border-green-500/20',
  PUT: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20',
  DELETE: 'bg-red-500/10 text-red-600 border-red-500/20',
};

export default function DocsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Documentación</h1>
          <p className="text-muted-foreground">
            API de gestión musical - Guía completa de endpoints
          </p>
        </div>

        <div className="grid gap-6 mb-8">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                <CardTitle>Información del Proyecto</CardTitle>
              </div>
              <CardDescription>
                Sistema de gestión musical completo construido con React, TypeScript y Next.js
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Tecnologías Utilizadas</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>React 19.2 + Next.js 16</li>
                    <li>TypeScript para type safety</li>
                    <li>Tailwind CSS v4 para estilos</li>
                    <li>React Query (@tanstack/react-query) para gestión de estado</li>
                    <li>React Hook Form + Zod para validación</li>
                    <li>Axios para peticiones HTTP</li>
                    <li>React Hot Toast para notificaciones</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">URL Base de la API</h3>
                  <code className="px-3 py-2 bg-muted rounded-md block text-sm">
                    {API_BASE_URL}
                  </code>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Características</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    <li>CRUD completo para Usuarios, Canciones y Favoritos</li>
                    <li>Paginación y filtros avanzados</li>
                    <li>Búsqueda en tiempo real</li>
                    <li>Validación de formularios con Zod</li>
                    <li>Diseño responsive y accesible</li>
                    <li>Tema musical con gradientes purple/blue</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Database className="h-5 w-5 text-primary" />
                <CardTitle>Enlace a Documentación Externa</CardTitle>
              </div>
              <CardDescription>
                Accede a la documentación completa de la API
              </CardDescription>
            </CardHeader>
            <CardContent>
              <a
                href="http://localhost:3000/docs"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="w-full sm:w-auto">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Ver Documentación MkDocs
                </Button>
              </a>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Endpoints Disponibles</h2>
          
          {endpoints.map((category) => {
            const Icon = category.icon;
            return (
              <Card key={category.category}>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Icon className="h-5 w-5 text-primary" />
                    <CardTitle>{category.category}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-lg overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-24">Método</TableHead>
                          <TableHead>Ruta</TableHead>
                          <TableHead>Descripción</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {category.routes.map((route, index) => (
                          <TableRow key={index}>
                            <TableCell>
                              <span
                                className={`px-2 py-1 rounded text-xs font-semibold border ${
                                  methodColors[route.method]
                                }`}
                              >
                                {route.method}
                              </span>
                            </TableCell>
                            <TableCell>
                              <code className="text-sm">{route.path}</code>
                            </TableCell>
                            <TableCell className="text-sm text-muted-foreground">
                              {route.description}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card className="mt-8 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
          <CardHeader>
            <CardTitle>Ejemplo de Uso</CardTitle>
            <CardDescription>Cómo realizar una petición a la API</CardDescription>
          </CardHeader>
          <CardContent>
            <pre className="bg-card p-4 rounded-md overflow-x-auto text-sm border">
              <code>{`// Ejemplo con Axios
import axios from 'axios';

const response = await axios.get('${API_BASE_URL}/api/canciones/', {
  params: {
    skip: 0,
    limit: 10,
    genero: 'Rock'
  }
});

console.log(response.data);
// {
//   items: [...],
//   total: 100,
//   page: 1,
//   size: 10,
//   pages: 10
// }`}</code>
            </pre>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}
