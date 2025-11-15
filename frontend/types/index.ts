// User types
export interface Usuario {
  id: number;
  nombre: string;
  correo: string;
  fecha_registro: string;
}

export interface UsuarioInput {
  nombre: string;
  correo: string;
}

// Song types
export interface Cancion {
  id: number;
  titulo: string;
  artista: string;
  album: string;
  duracion: number;
  año: number;
  genero: string;
}

export interface CancionInput {
  titulo: string;
  artista: string;
  album: string;
  duracion: number;
  año: number;
  genero: string;
}

// Favorite types
export interface Favorito {
  id: number;
  id_usuario: number;
  id_cancion: number;
  fecha_marcado: string;
  usuario?: Usuario;
  cancion?: Cancion;
}

export interface FavoritoInput {
  id_usuario: number;
  id_cancion: number;
}

// Paginated response
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  size: number;
  pages: number;
}

// Statistics
export interface Estadisticas {
  total: number;
  [key: string]: number | string;
}

// API Error
export interface ApiError {
  detail: string | { msg: string; type: string }[];
}
