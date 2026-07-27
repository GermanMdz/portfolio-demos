import { Usuario } from '../../domain/usuario/usuario';
import { RegisterDto, AuthResponseDto } from '../auth/authDtos';

export class AuthMapper {
  // DTO -> Domain (cuando llega del cliente)
  static fromRegisterDtoToDomain(dto: RegisterDto): Usuario {
    const usuario = new Usuario(dto.nombre);
    usuario.email = dto.email;
    usuario.password = dto.password;
    usuario.rubro = dto.rubro;
    usuario.telefono = dto.telefono;
    usuario.role = 'user';
    return usuario;
  }

  // Domain -> ResponseDto (cuando respondemos al cliente)
  // IMPORTANTE: NO incluir password en la respuesta
  static fromDomainToAuthResponseDto(
    usuario: Usuario,
    token: string
  ): AuthResponseDto {
    return {
      id: usuario.id!,
      nombre: usuario.nombre,
      email: usuario.email!,
      rubro: usuario.rubro!,
      telefono: usuario.telefono!,
      role: usuario.role!,
      token,
    };
  }

  // Para actualizar perfil (sin password)
  static fromDomainToProfileDto(usuario: Usuario) {
    return {
      id: usuario.id,
      nombre: usuario.nombre,
      email: usuario.email,
      role: usuario.role,
      telefono: usuario.telefono,
      rubro: usuario.rubro,
      createdAt: usuario.createdAt,
    };
  }
}

export const authMapper = AuthMapper;