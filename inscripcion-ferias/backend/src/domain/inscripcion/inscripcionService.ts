import { obtenerUsuarioPorIdRepo, actualizarEstadoInscripcionesRepo } from "../../infra/repositories/usuarioRepository";
import { obtenerInscripcionRepo, crearInscripcionRepo, obtenerInscripcionesRepo } from "../../infra/repositories/inscripcionRepository";
import { obtenerFeriaPorId as obtenerFeriaPorIdRepo } from "../../infra/repositories/feriaRepository";
import { Inscripcion } from "./Inscripcion";
import { OrdenLlegada } from "./OrdenLlegada";
import { PrioridadInicial, PrioridadRegenerada  } from "./Prioridad";
import { Criterio } from "./Criterio";
import { feriaService } from "../feria/feriaService";
import { aplicarCaducidadRechazados } from "./reglasInscripcion";
import { DatosUsuarioIncripcion } from "../usuario/usuario";

export class InscripcionService {
    async inscribirUsuarioAFeria(usuarioId: number, feriaId: number) {
        const usuario = await obtenerUsuarioPorIdRepo(usuarioId);
        const feria = await obtenerFeriaPorIdRepo(feriaId);

        if (!usuario || !feria) throw new Error("Usuario o Feria no existe");
        const inscripcion = new Inscripcion(usuario.id!, feria.id!);

        const existente = await obtenerInscripcionRepo(inscripcion);
        if (existente) {
            throw new Error("Ya te inscribiste a esta feria.");
        }
        return await crearInscripcionRepo(inscripcion);
    }

    async obtenerInscripciones(feriaId: number) {
        return await obtenerInscripcionesRepo(feriaId);
    }

    async obtenerListadoPorLlegada(feriaId: number) {
        const feria = await obtenerFeriaPorIdRepo(feriaId);
        if (!feria) throw new Error("Feria no existe");
        const usuarios = await obtenerInscripcionesRepo(feriaId);
        const criterio = new OrdenLlegada();
        return criterio.generarListados(usuarios, feria.cupo!);
    }

    async obtenerListadoPorPrioridad(feriaId: number) {
        const feria = await obtenerFeriaPorIdRepo(feriaId);
        if (!feria) throw new Error("Feria no existe");
        if (!feria.listasGeneradas) {
            const modificados = await aplicarCaducidadRechazados();
            await actualizarEstadoInscripcionesRepo(modificados);
            await feriaService.marcarListasGeneradas(feria.id!); // TODO: aca no va esto, marcarlas cuando se pulsa guardar PDF en el front
        }

        const criterio = (!feria.listasGeneradas) ? new PrioridadInicial() : new PrioridadRegenerada();
        const usuarios = await obtenerInscripcionesRepo(feriaId);
        return criterio.generarListados(usuarios, feria.cupo!);
    }
}

export const inscripcionService = new InscripcionService();