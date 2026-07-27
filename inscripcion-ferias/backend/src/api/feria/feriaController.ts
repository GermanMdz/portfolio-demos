import { type Request, type Response } from "express";
import { feriaService } from "../../domain/feria/feriaService";
import { feriaMapper } from "../mappers/feriaMapper";
import { inscripcionService } from "../../domain/inscripcion/inscripcionService";

export const crearFeria = async (req: Request, res: Response) => {
    try {
        const feria = feriaMapper.fromDtoToDomain(req.body);
        const feriaCreada = await feriaService.crear(feria);
        const feriaDto = feriaMapper.fromDomainToDto(feriaCreada);
        return res.status(201).json(feriaDto);
    } catch (e: any) {
        return res.status(400).json({ error: e.message });
    }
};

export const obtenerFerias = async (req: Request, res: Response) => {
    try {
        const ferias = await feriaService.obtenerFerias();
        const feriasDto = ferias.map(feriaMapper.fromDomainToDto);
        return res.status(200).json(feriasDto);
    } catch (e: any) {
        return res.status(400).json({ error: e.message });
    }
};

export const obtenerProximasFerias = async (req: Request, res: Response) => {
    try {
        const ferias = await feriaService.obtenerProximasFerias();
        const feriasDto = ferias.map(feriaMapper.fromDomainToDto);
        return res.status(200).json(feriasDto);
    } catch (e: any) {
        return res.status(400).json({ error: e.message });
    }
};

export const obtenerFeriaPorId = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id!);
        const feria = await feriaService.obtenerFeriaPorId(id);
        const feriaDto = feriaMapper.fromDomainToDto(feria);
        return res.status(200).json(feriaDto); // 200 OK
    } catch (e: any) {
        return res.status(400).json({ error: e.message });
    }
};

export const actualizarFeria = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id!);
        const body = req.body || {};
        const feria = await feriaService.obtenerFeriaPorId(id);
        // Merge provided fields
        if (body.nombre !== undefined) feria.nombre = body.nombre;
        if (body.fecha !== undefined) feria.fecha = body.fecha;
        if (body.horaInicio !== undefined) feria.horaInicio = body.horaInicio;
        if (body.horaFin !== undefined) feria.horaFin = body.horaFin;
        if (body.direccion !== undefined) feria.direccion = body.direccion;
        if (body.cupo !== undefined) feria.cupo = body.cupo;
        if (body.listasGeneradas !== undefined) feria.listasGeneradas = body.listasGeneradas;

        const updated = await feriaService.actualizar(feria);
        const feriaDto = feriaMapper.fromDomainToDto(updated);
        return res.status(200).json(feriaDto);
    } catch (e: any) {
        return res.status(400).json({ error: e.message });
    }
};

export const inscribirUsuarioAFeria = async (req: Request, res: Response) => {
    try {
        const usuarioId = req.body.usuarioId
        const feriaId = req.body.feriaId;
        const inscripcion = await inscripcionService.inscribirUsuarioAFeria(usuarioId, feriaId);
        return res.status(201).json(inscripcion);
    } catch (e: any) {
        return res.status(400).json({ error: e.message });
    }
};

export const obtenerInscripciones = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id!);
        const usuarios = await inscripcionService.obtenerInscripciones(id);
        return res.status(200).json(usuarios);
    } catch (e: any) {
        return res.status(400).json({ error: e.message });
    }
};

export const obtenerListadoPorLlegada = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id!);
        const usuarios = await inscripcionService.obtenerListadoPorLlegada(id);
        return res.status(200).json(usuarios);
    } catch (e: any) {
        return res.status(400).json({ error: e.message });
    }
};

export const obtenerListadoPorPrioridad = async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id!);
        const usuarios = await inscripcionService.obtenerListadoPorPrioridad(id);
        return res.status(200).json(usuarios);
    } catch (e: any) {
        return res.status(400).json({ error: e.message });
    }
};

// export const obtenerInscripcion = async (req: Request, res: Response) => {
//     try { 
//         const usuarioId = req.body.usuarioId
//         const feriaId = req.body.feriaId;
//         const inscripcion = await feriaService.obtenerInscripcion(usuarioId, feriaId);
//         return res.status(201).json(inscripcion);
//     }
//     catch (e: any) { 
//         return res.status(400).json({ error: e.message });
//     }
// }


// no tiene utilidad, solo para ver funcionamiento
export const cantidadFeria = async (req: Request, res: Response) => {
    try {
        const cantidad = await feriaService.obtenerCantidad();
        return res.status(200).json(cantidad);
    } catch (e: any) {
        return res.status(400).json({ error: e.message });
    }
};
