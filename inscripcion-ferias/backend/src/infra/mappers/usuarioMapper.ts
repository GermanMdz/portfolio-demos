import { DatosUsuarioIncripcion, Usuario } from '../../domain/usuario/usuario';
import { UsuarioEntity } from '../entities/usuarioEntity';

export class UsuarioMapper {
  static fromEntityToDomain(entity: UsuarioEntity): Usuario {
    const usuario = new Usuario(entity.nombre);
    usuario.id = entity.id;
    usuario.email = entity.email;
    usuario.password = entity.password;
    usuario.role = entity.role;
    usuario.telefono = entity.telefono;
    usuario.rubro = entity.rubro;
    usuario.ultimaInscripcion = entity.ultimaInscripcion,
    usuario.ultimaInscripcionFeriaId = entity.ultimaInscripcionFeriaId,
    usuario.createdAt = entity.createdAt;
    return usuario;
  }

  static fromDomainToEntity(usuario: Usuario): Partial<UsuarioEntity> {
    return {
      nombre: usuario.nombre,
      email: usuario.email!,
      password: usuario.password!,
      role: usuario.role!,
      telefono: usuario.telefono!,
      rubro: usuario.rubro!,
      ultimaInscripcion: usuario.ultimaInscripcion!,
      ultimaInscripcionFeriaId: usuario.ultimaInscripcionFeriaId!
    };
  }

  static fromEntitieToDatosUsuarioInscripcion(entity: UsuarioEntity, fecha:Date) {
    const usuario: DatosUsuarioIncripcion = {
      id: entity.id,
      nombre: entity.nombre,
      email: entity.email!,
      rubro: entity.rubro!,
      telefono: entity.telefono!,
      ultimaInscripcion: entity.ultimaInscripcion!,
      ultimaInscripcionFeriaId: (entity as any).ultimaInscripcionFeriaId,
      createdAt: fecha,
    };
    return usuario;
  }
}