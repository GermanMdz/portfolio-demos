import e from 'express';
import { AppDataSource } from '../../data-source';
import { Usuario } from '../../domain/usuario/usuario';
import { UsuarioEntity } from '../entities/usuarioEntity';
import { UsuarioMapper } from '../mappers/usuarioMapper';

const getRepo = () => AppDataSource.getRepository(UsuarioEntity);

export async function crearUsuarioRepo(usuario: Usuario): Promise<Usuario> {
  const repo = getRepo();
  const entity = UsuarioMapper.fromDomainToEntity(usuario);
  const saved = await repo.save(repo.create(entity));
  return UsuarioMapper.fromEntityToDomain(saved);
}

export async function obtenerUsuarioPorEmailRepo(email: string): Promise<Usuario | null> {
  const repo = getRepo();
  const entity = await repo.findOne({ where: { email } });
  if (!entity) return null;
  return UsuarioMapper.fromEntityToDomain(entity);
}

export async function obtenerUsuarioPorIdRepo(id: number): Promise<Usuario | null> {
  const repo = getRepo();
  const entity = await repo.findOne({ where: { id } });
  if (!entity) return null;
  return UsuarioMapper.fromEntityToDomain(entity);
}

export async function obtenerTodosUsuariosRepo(): Promise<Usuario[]> {
  const repo = getRepo();
  const entities = await repo.find();
  return entities.map(e => UsuarioMapper.fromEntityToDomain(e));
}

export async function actualizarEstadoInscripcionesRepo(usuarios: Usuario[]) {
  const repo = getRepo();
  for (const u of usuarios) {
    await repo.update(u.id!, {
      ultimaInscripcion: u.ultimaInscripcion!
    });
    console.log(`Usuario ${u.id} actualizado a estado ${u.ultimaInscripcion}`);
  }
}


export async function actualizarUsuarioRepo(usuario: Usuario): Promise<Usuario> {
  const repo = getRepo();
  const entity = UsuarioMapper.fromDomainToEntity(usuario);
  await repo.update(usuario.id!, entity);
  const updated = await repo.findOne({ where: { id: usuario.id! } });
  if (!updated) throw new Error('Usuario no actualizado');
  return UsuarioMapper.fromEntityToDomain(updated);
}