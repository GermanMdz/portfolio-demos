import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Usuario } from '../usuario/usuario';
import {
  crearUsuarioRepo,
  obtenerUsuarioPorEmailRepo,
  obtenerUsuarioPorIdRepo,
} from '../../infra/repositories/usuarioRepository';
import { TokenPayload } from '../../api/auth/authDtos';

const JWT_SECRET = process.env.JWT_SECRET || 'secret_key';
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || 'refresh_secret_key';
const JWT_EXPIRATION = '15m';
const JWT_REFRESH_EXPIRATION = '7d';

export class AuthService {
  async register(usuario: Usuario): Promise<Usuario> {
    const existente = await obtenerUsuarioPorEmailRepo(usuario.email!);
    if (existente) {
      throw new Error('El email ya está registrado');
    }
    usuario.password = await bcrypt.hash(usuario.password!, 10);
    return await crearUsuarioRepo(usuario);
  }

  async login(email: string, password: string): Promise<{ usuario: Usuario; token: string; refreshToken: string }> {
    const usuario = await obtenerUsuarioPorEmailRepo(email);
    if (!usuario) {
      throw new Error('Email o contraseña incorrectos');
    }

    if (!usuario.password || !password) {
      throw new Error('Email o contraseña incorrectos');
    }

    const passwordValida = await bcrypt.compare(password, usuario.password);
    
    if (!passwordValida) {
      throw new Error('Email o contraseña incorrectos');
    }

    const token = this.generarToken(usuario);
    const refreshToken = this.generarRefreshToken(usuario);
    

    return { usuario, token, refreshToken };
  }

  async refreshToken(refreshToken: string): Promise<{ token: string; refreshToken: string }> {
    try {
      const payload = jwt.verify(refreshToken, JWT_REFRESH_SECRET) as TokenPayload;
      const usuario = await obtenerUsuarioPorIdRepo(payload.userId);
      if (!usuario) {
        throw new Error('Usuario no encontrado');
      }

      const nuevoToken = this.generarToken(usuario);
      const nuevoRefreshToken = this.generarRefreshToken(usuario);

      return { token: nuevoToken, refreshToken: nuevoRefreshToken };
    } catch (error) {
      throw new Error('Refresh token inválido');
    }
  }

  async me(token: string): Promise<Usuario> {
    try {
      const payload = jwt.verify(token, JWT_SECRET) as TokenPayload;
      const usuario = await obtenerUsuarioPorIdRepo(payload.userId);
      if (!usuario) {
        throw new Error('Usuario no encontrado');
      }
      return usuario;
    } catch (error) {
      throw new Error('Token inválido');
    }
  }

  private generarToken(usuario: Usuario): string {
    const payload: TokenPayload = {
      userId: usuario.id!,
      email: usuario.email!,
      role: usuario.role!,
    };
    return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
  }

  private generarRefreshToken(usuario: Usuario): string {
    const payload: TokenPayload = {
      userId: usuario.id!,
      email: usuario.email!,
      role: usuario.role!,
    };
    return jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: JWT_REFRESH_EXPIRATION });
  }
}

export const authService = new AuthService();