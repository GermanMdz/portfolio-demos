import { Feria } from "../../domain/feria/feria";

export class feriaMapper {
    static fromDtoToDomain(entity: any): Feria {
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

    static fromDomainToDto(feria: Feria) {
        return {
            id: feria.id,
            nombre: feria.nombre,
            fecha: feria.fecha,
            direccion: feria.direccion,
            horaInicio: feria.horaInicio,
            horaFin: feria.horaFin,
            cupo: feria.cupo,
            listasGeneradas: feria.listasGeneradas,
            createdAt: feria.createdAt,
        };
    }
}