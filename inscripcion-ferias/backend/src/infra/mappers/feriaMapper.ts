import { Feria } from "../../domain/feria/feria";

export class feriaMapper {
    static fromEntityToDomain(entity: any): Feria {
        const feria = new Feria(entity.nombre);
        feria.id = entity.id;
        feria.fecha = entity.fecha;
        feria.horaInicio = entity.horaInicio;
        feria.horaFin = entity.horaFin;
        feria.direccion = entity.direccion;
        feria.cupo = entity.cupo;
        feria.listasGeneradas = entity.listasGeneradas
        feria.createdAt = entity.createdAt;
        return feria;
    }
    static fromDomainToEntity(domain: Feria): any {
        return {
            id: domain.id,
            nombre: domain.nombre,
            fecha: domain.fecha,
            horaInicio: domain.horaInicio,
            horaFin: domain.horaFin,
            direccion: domain.direccion,
            cupo: domain.cupo,
            listasGeneradas: domain.listasGeneradas,
            createdAt: domain.createdAt,
        };
    }
}
