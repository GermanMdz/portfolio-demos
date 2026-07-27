import { Inscripcion } from "../../domain/inscripcion/Inscripcion";
import { InscripcionEntity } from "../entities/inscripcion";

export class InscripcionMapper {

  static fromDomainToEntity(domain: Inscripcion): InscripcionEntity {
    const entity = new InscripcionEntity();
    entity.usuarioId = domain.usuarioId!;
    entity.feriaId = domain.feriaId!;
    entity.estado = domain.estado ?? "pendiente";
    return entity;
  }

  static fromEntityToDomain(entity: InscripcionEntity): Inscripcion {
    return {
      usuarioId: entity.usuarioId,
      feriaId: entity.feriaId,
      estado: entity.estado,
      createdAt: entity.createdAt,
    };
  }
}
