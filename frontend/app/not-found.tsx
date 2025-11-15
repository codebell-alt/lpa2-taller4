'use client';

import Link from 'next/link';
import { Home, ArrowLeft, Music2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="text-center max-w-md">
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
            <Music2 className="relative h-24 w-24 text-primary animate-pulse" />
          </div>
        </div>
        
        <h1 className="text-9xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          404
        </h1>
        
        <h2 className="text-3xl font-bold mb-4">Página no encontrada</h2>
        
        <p className="text-muted-foreground mb-8 text-balance">
          Lo sentimos, la página que buscas no existe o ha sido movida. 
          Parece que esta melodía se perdió en el éter digital.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button size="lg" className="w-full sm:w-auto">
              <Home className="h-4 w-4 mr-2" />
              Ir al Dashboard
            </Button>
          </Link>
          <Button
            variant="outline"
            size="lg"
            onClick={() => window.history.back()}
            className="w-full sm:w-auto"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Volver Atrás
          </Button>
        </div>

        <div className="mt-12 pt-8 border-t">
          <p className="text-sm text-muted-foreground">
            ¿Necesitas ayuda? Visita nuestra{' '}
            <Link href="/docs" className="text-primary hover:underline">
              documentación
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
