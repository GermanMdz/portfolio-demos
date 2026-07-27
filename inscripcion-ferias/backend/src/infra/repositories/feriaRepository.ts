import { AppDataSource } from "../../data-source";
import { Feria } from "../../domain/feria/feria";
import { FeriaEntity } from "../entities/feriaEntity";
import { feriaMapper } from "../mappers/feriaMapper";

const repo = () => AppDataSource.getRepository(FeriaEntity);

export async function crearFeriaRepo(domainFeria: Feria) {
    const r = repo();
    const feria = feriaMapper.fromDomainToEntity(domainFeria);
    const entity = r.create(feria);
    const saved = await r.save(entity);
    return feriaMapper.fromEntityToDomain(saved);
}

export async function obtenerFeriaPorNombre(domainFeria: Feria) {
    const r = repo();
    const feria = feriaMapper.fromDomainToEntity(domainFeria);
    const found = await r.findOneBy({ nombre: feria.nombre });
    if (!found) return null;
    return feriaMapper.fromEntityToDomain(found);
}

export async function obtenerFeriaPorId(idFeria: number) {
    const r = repo();
    const found = await r.findOneBy({ id: idFeria });
    if (!found) return null;
    return feriaMapper.fromEntityToDomain(found);
}

export async function obtenerFeriasRepo() {
    const r = repo();
    const ferias = await r.find();
    return ferias.map(feriaMapper.fromEntityToDomain);
}

export async function obtenerCantidadRepo() {
    const r = repo();
    const cantidad = await r.count();
    return { cantidad };
}

export async function obtenerInscripcionesRepo(feriaId: number) {
    throw new Error("Esta funcionalidad ha sido movida a InscripcionRepository");
}

export async function actualizarFeriaRepo(domainFeria: Feria) {
    const r = repo();
    if (!domainFeria.id) throw new Error("Feria id es requerido para actualizar");
    const found = await r.findOneBy({ id: domainFeria.id });
    if (!found) throw new Error("Feria no encontrada");

    const toUpdate = feriaMapper.fromDomainToEntity(domainFeria);
    // Merge only provided values
    const merged = { ...found, ...toUpdate };
    const saved = await r.save(merged);
    return feriaMapper.fromEntityToDomain(saved);
}

export async function obtenerFeriaAnteriorRepo(feriaId: number) {
    const r = repo();
    const current = await r.findOneBy({ id: feriaId });
    if (!current || !current.fecha) return null;
    const prev = await r
        .createQueryBuilder("f")
        .where("f.fecha < :fecha", { fecha: current.fecha })
        .orderBy("f.fecha", "DESC")
        .getOne();
    if (!prev) return null;
    return feriaMapper.fromEntityToDomain(prev as any);
}

export default repo;