export interface RegisterDto {
  nombre: string;
  email: string;
  password: string;
  rubro?: string;
  telefono?: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface TokenPayload {
  userId: number;
  email: string;
  role: string;
}

export interface Usuario{
  id: number;
  nombre: string;
  email: string;
  rubro?: string;
  telefono?: string;
  role: string;
}

export interface DatosUsuarioIncripcion{
    id: number;
    nombre: string;
    email: string;
    rubro: string;
    telefono: string;
    ultimaInscripcion: string;
      ultimaInscripcionFeriaId?: number; // Added for UI to work with new field
    createdAt: Date;
}