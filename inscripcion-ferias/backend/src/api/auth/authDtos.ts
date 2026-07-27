export interface RegisterDto {
  nombre: string;
  email: string;
  password: string;
  telefono?: string;
  rubro?: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface AuthResponseDto {
  id: number;
  nombre: string;
  email: string;
  role: 'admin' | 'user';
  rubro?: string;
  telefono?: string;
  token: string;
  // refreshToken: string;
}

export interface TokenPayload {
  userId: number;
  email: string;
  role: 'admin' | 'user';
  iat?: number;
  exp?: number;
}