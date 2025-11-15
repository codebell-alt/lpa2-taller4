# API de Música - Frontend + Backend

## Autor

**Isabella Ramirez Franco**  
GitHub: [@codebell-alt](https://github.com/codebell-alt)  
Email: isabella315784@gmail.com

---

## Descripción

Proyecto completo de gestión de música desarrollado con FastAPI en el backend y Next.js en el frontend. Incluye CRUD completo de usuarios, canciones y sistema de favoritos, con pruebas automatizadas, documentación completa y precommits configurados.

## Características principales

- CRUD completo de Usuarios
- CRUD completo de Canciones
- Sistema de Favoritos
- Paginación y filtros avanzados
- Validaciones con Zod
- Gestión de estados (loading, error, empty)
- Diseño responsive
- Documentación interactiva con MkDocs
- Pruebas automatizadas (Vitest + pytest)
- Pre-commits con Husky

## Stack tecnológico

### Backend
- FastAPI 0.115.x
- SQLAlchemy 2.0.x
- PostgreSQL
- Pydantic para validaciones

### Frontend
- Next.js 16.x
- React 19.x
- TypeScript 5.x
- Tailwind CSS 4.x
- React Query para estado del servidor
- Axios para peticiones HTTP
- React Hook Form + Zod

### Pruebas
- Vitest + React Testing Library (Frontend)
- pytest (API)

### DevOps
- Husky para pre-commits
- lint-staged
- Conventional Commits
- MkDocs Material para documentación

## Estructura del proyecto

```
lpa2-taller4/
├── frontend/              # Aplicación Next.js
│   ├── app/              # Páginas y rutas
│   ├── components/       # Componentes reutilizables
│   ├── hooks/            # Custom hooks
│   ├── services/         # Servicios API
│   ├── types/            # Tipos TypeScript
│   └── __tests__/        # Pruebas Vitest
├── tests_api/            # Pruebas de contrato API
│   ├── test_endpoints.py
│   └── requirements.txt
├── docs/                 # Documentación MkDocs
│   └── docs/            # Archivos markdown
├── .husky/               # Git hooks
├── mkdocs.yml           # Configuración MkDocs
├── package.json         # Scripts raíz
└── README.md            # Este archivo
```

## Inicio rápido

### Prerequisitos

- Node.js 18+ y pnpm
- Python 3.10+
- PostgreSQL (para backend)
- Git

### Instalación

#### 1. Clonar el repositorio

```bash
git clone https://github.com/codebell-alt/lpa2-taller4.git
cd lpa2-taller4
```

#### 2. Instalar dependencias raíz

```bash
pnpm install
```

#### 3. Configurar y ejecutar el frontend

```bash
cd frontend
pnpm install
pnpm dev
```

El frontend estará disponible en `http://localhost:3000`

#### 4. Configurar backend (lpa2-taller3)

El backend debe estar corriendo en otro proyecto:

```bash
cd ~/proyectos/lpa2-taller3
# Seguir instrucciones de instalación del backend
uvicorn main:app --reload --port 3000
```

### Ejecutar pruebas

#### Pruebas Frontend

```bash
cd frontend
pnpm test              # Modo watch
pnpm test:ui           # Interfaz visual
pnpm test:coverage     # Con cobertura
```

#### Pruebas API (requiere backend corriendo)

```bash
cd tests_api
pip install -r requirements.txt
pytest -v
pytest -v --cov        # Con cobertura
```

### Documentación

#### Servir localmente

```bash
# Instalar MkDocs (primera vez)
pip install mkdocs mkdocs-material mkdocs-mermaid2-plugin

# Servir documentación
mkdocs serve
```

Disponible en `http://localhost:8000`

#### Construir documentación estática

```bash
mkdocs build
```

#### Desplegar a GitHub Pages

```bash
mkdocs gh-deploy
```

## Configuración de Git

Este proyecto usa el usuario de Isabella Ramirez Franco. Para configurar Git:

```bash
# Limpiar configuración previa
git config --global --unset-all user.name
git config --global --unset-all user.email

# Configurar usuario
git config --global user.name "codebell-alt"
git config --global user.email "isabella315784@gmail.com"

# Verificar
git config --global user.name
git config --global user.email
```

## Commits con Conventional Commits

El proyecto usa Conventional Commits. Formato:

```
tipo(scope): descripción
```

### Tipos válidos

- `feat`: Nueva característica
- `fix`: Corrección de bug
- `docs`: Cambios en documentación
- `style`: Formateo, puntos y comas
- `refactor`: Refactorización de código
- `test`: Agregar o actualizar pruebas
- `chore`: Mantenimiento
- `perf`: Mejoras de rendimiento
- `ci`: Cambios en CI/CD
- `build`: Cambios en build
- `revert`: Revertir cambios

### Ejemplos

```bash
git commit -m "feat: agregar módulo de estadísticas"
git commit -m "fix: corregir paginación en usuarios"
git commit -m "docs: actualizar guía de instalación"
git commit -m "test: agregar pruebas para hook useUsuarios"
```

## Pre-commits

Los pre-commits están configurados con Husky y ejecutan automáticamente:

- Linting del código frontend
- Formateo de código Python (black, isort)
- Validación de formato de commits

Los hooks se ejecutan automáticamente al hacer commit. Si hay errores, el commit será rechazado.

## Endpoints principales

### Usuarios
- `GET /api/usuarios/` - Listar usuarios (paginado)
- `POST /api/usuarios/` - Crear usuario
- `GET /api/usuarios/{id}` - Obtener usuario
- `PUT /api/usuarios/{id}` - Actualizar usuario
- `DELETE /api/usuarios/{id}` - Eliminar usuario
- `GET /api/usuarios/buscar/por-correo` - Buscar por correo
- `GET /api/usuarios/estadisticas/resumen` - Estadísticas

### Canciones
- `GET /api/canciones/` - Listar canciones (paginado, filtros)
- `POST /api/canciones/` - Crear canción
- `GET /api/canciones/{id}` - Obtener canción
- `PUT /api/canciones/{id}` - Actualizar canción
- `DELETE /api/canciones/{id}` - Eliminar canción
- `GET /api/canciones/buscar/avanzada` - Búsqueda avanzada
- `GET /api/canciones/generos/lista` - Listar géneros
- `GET /api/canciones/artistas/lista` - Listar artistas
- `GET /api/canciones/estadisticas/resumen` - Estadísticas

### Favoritos
- `GET /api/favoritos/` - Listar favoritos (paginado)
- `POST /api/favoritos/` - Marcar favorito
- `DELETE /api/favoritos/{id}` - Quitar favorito
- `GET /api/favoritos/usuario/{usuario_id}` - Favoritos de usuario
- `POST /api/favoritos/usuario/{usuario_id}/cancion/{cancion_id}` - Marcar directo
- `DELETE /api/favoritos/usuario/{usuario_id}/cancion/{cancion_id}` - Quitar directo
- `GET /api/favoritos/verificar/{usuario_id}/{cancion_id}` - Verificar favorito
- `GET /api/favoritos/estadisticas/resumen` - Estadísticas

### Otros
- `GET /health` - Health check
- `GET /stats` - Estadísticas de la BD
- `GET /info/desarrollador` - Info del desarrollador

Ver documentación completa en `/docs` o en [GitHub Pages](https://codebell-alt.github.io/lpa2-taller4/)

## Scripts disponibles

### Scripts raíz

```bash
pnpm frontend:dev      # Ejecutar frontend en desarrollo
pnpm frontend:build    # Build del frontend
pnpm frontend:test     # Ejecutar pruebas del frontend
pnpm api:test          # Ejecutar pruebas de la API
pnpm docs:serve        # Servir documentación
pnpm docs:build        # Build de documentación
pnpm docs:deploy       # Deploy docs a GitHub Pages
```

### Scripts del frontend

```bash
cd frontend
pnpm dev               # Desarrollo
pnpm build             # Producción
pnpm start             # Servir build
pnpm lint              # Linting
pnpm test              # Pruebas
pnpm test:ui           # Pruebas con UI
pnpm test:coverage     # Cobertura
```

## Desarrollo

### Estructura de componentes

```
components/
├── layout/           # Navbar, Footer, etc.
├── ui/              # Componentes base (shadcn/ui)
├── usuarios/        # Componentes específicos de usuarios
├── canciones/       # Componentes específicos de canciones
└── favoritos/       # Componentes específicos de favoritos
```

### Hooks personalizados

```typescript
import { useUsuarios, useCreateUsuario } from '@/hooks/useUsuarios'
import { useCanciones } from '@/hooks/useCanciones'
import { useFavoritos } from '@/hooks/useFavoritos'
```

### Servicios API

```typescript
import { getUsuarios, createUsuario } from '@/services/usuarios.service'
import { getCanciones } from '@/services/canciones.service'
```

## Despliegue

### Frontend (Vercel)

```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
cd frontend
vercel
```

### Documentación (GitHub Pages)

```bash
mkdocs gh-deploy
```

## Solución de problemas

### Error: pnpm no encontrado

```bash
npm install -g pnpm
```

### Error: Puerto 3000 en uso

Cambiar el puerto del backend o frontend según sea necesario.

### Error: No se puede conectar a la API

Verificar que el backend esté corriendo:

```bash
curl http://localhost:3000/health
```

### Error: Husky no ejecuta hooks

Reinstalar hooks:

```bash
rm -rf .git/hooks
pnpm install
npx husky install
```

## Documentación completa

Para documentación detallada, visita:

- [Instalación](https://codebell-alt.github.io/lpa2-taller4/instalacion/)
- [Arquitectura](https://codebell-alt.github.io/lpa2-taller4/arquitectura/)
- [API Endpoints](https://codebell-alt.github.io/lpa2-taller4/api-endpoints/)
- [Desarrollo Frontend](https://codebell-alt.github.io/lpa2-taller4/frontend/)
- [Pruebas](https://codebell-alt.github.io/lpa2-taller4/pruebas/)
- [Despliegue](https://codebell-alt.github.io/lpa2-taller4/despliegue/)
- [Contribución](https://codebell-alt.github.io/lpa2-taller4/contribucion/)

## Licencia

Este proyecto es parte del curso de Laboratorio de Programación Aplicada 2.

## Contacto

**Isabella Ramirez Franco**  
Email: isabella315784@gmail.com  
GitHub: [@codebell-alt](https://github.com/codebell-alt)

---

**Desarrollado con dedicación por Isabella Ramirez Franco**  
        - Optimiza el rendimiento (ej: caching, lazy loading)  
        - [ESPECIFICA: Validaciones de datos necesarias]

    ---

## Generar y Descargar el Código

1. Ejecuta el *prompt* en [v0.app](https://v0.app)
2. Revisa el *preview* y realiza los ajustes necesarios
3. Descarga el `ZIP` con la aplicación
4. Ve al proyecto: `cd proyectos/lpa2-taller4`
5. Descomprime el `ZIP` en este directorio
6. Configurar Node v20: `curl -sL https://deb.nodesource.com/setup_20.x | sudo -E bash -`
7. Instalar Node/NPM: `sudo apt install nodejs -y`
8. Instalar PNPM: `sudo npm install -g pnpm`
9. Instalar las dependencias del proyecto: `pnpm install`
10. Ejecutar en modo desarrollo: `pnpm dev`
11. Abrir la aplicación en: [localhost:3000](http://localhost:3000/)
12. Revisa y ajusta la configuración del API
13. Para ejecutar en modo producción: `pnpm build` y luego: `pnpm start`

