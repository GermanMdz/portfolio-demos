import { crearFeriaRepo, obtenerCantidadRepo, obtenerFeriasRepo, obtenerFeriaPorNombre, obtenerFeriaPorId, actualizarFeriaRepo, obtenerFeriaAnteriorRepo } from "../../infra/repositories/feriaRepository";
import { obtenerUsuarioPorIdRepo } from "../../infra/repositories/usuarioRepository";
import { Feria } from "./feria";

export class FeriaService {

    async crear(feria: Feria): Promise<Feria> {
        const feriaExiste = await obtenerFeriaPorNombre(feria);
        if (feriaExiste) {
            throw new Error("La feria ya existe");
        }
        return crearFeriaRepo(feria);
    }

    async obtenerFerias(): Promise<Feria[]> {
        const ferias = await obtenerFeriasRepo();
        if (!ferias || ferias.length === 0) {
            throw new Error("No hay ferias registradas");
        }
        return ferias;
    }

    async obtenerProximasFerias(): Promise<Feria[]> {
        const ferias = await this.obtenerFerias();
        const hoy = new Date();
        hoy.setDate(hoy.getDate() - 1); // Para incluir las ferias de hoy
        const proximas = ferias
            .filter(
                (feria) => feria.fecha && new Date(feria.fecha) >= hoy
            )
            .sort((a, b) => {
                return new Date(a.fecha!).getTime() - new Date(b.fecha!).getTime();
            });
        return proximas;
    }

    async obtenerFeriaPorId(id: number): Promise<Feria> {
        // Hardcodeo de ejemplo
        const feria = await obtenerFeriaPorId(id);
        if (!feria) {
            throw new Error("Feria no encontrada");
        }
        return feria;
    }

    async actualizar(feria: Feria): Promise<Feria> {
        // Verificar existencia
        const existing = await obtenerFeriaPorId(feria.id!);
        if (!existing) throw new Error("Feria no encontrada");
        return await actualizarFeriaRepo(feria);
    }

    async obtenerInscripciones(feriaId: number) {
        const feria = await obtenerFeriaPorId(feriaId);
        if (!feria) throw new Error("La feria no existe");
        throw new Error("Esta funcionalidad ha sido movida a InscripcionService");
    }

    async obtenerFeriaAnterior(feriaId: number): Promise<Feria | null> {
        return await obtenerFeriaAnteriorRepo(feriaId);
    }

    async marcarListasGeneradas(feriaId: number) {
        const f = await obtenerFeriaPorId(feriaId);
        if (!f) throw new Error("Feria no encontrada");
        if (!f.listasGeneradas) {
            f.listasGeneradas = true;
            return await actualizarFeriaRepo(f);
        }
        return f;
    }

    async obtenerCantidad(): Promise<{ cantidad: number }> {
        const cantidad = await obtenerCantidadRepo();
        if (cantidad.cantidad === 0) {
            throw new Error("No hay ferias registradas");
        }
        return cantidad;
    }
}

export const feriaService = new FeriaService();
