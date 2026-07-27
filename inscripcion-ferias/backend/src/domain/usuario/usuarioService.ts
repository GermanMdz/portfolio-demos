import { actualizarUsuarioRepo, crearUsuarioRepo, obtenerUsuarioPorIdRepo, obtenerTodosUsuariosRepo } from "../../infra/repositories/usuarioRepository";
import { Usuario } from "./usuario";
type CampoActualizable = "ultimaInscripcion" | "email" | "nombre";

export class UsuarioService {

    async crear(nombre: string): Promise<Usuario> {
        const domain = new Usuario(nombre);
        return await crearUsuarioRepo(domain);
    }

    async obtenerUsuario(id: number): Promise<Usuario> {
        const usuario = await obtenerUsuarioPorIdRepo(id);
        if (!usuario) {
            throw new Error("Usuario no encontrado");
        }
        return usuario;
    }

    async obtenerTodosUsuarios(): Promise<Usuario[]> {
        return await obtenerTodosUsuariosRepo();
    }

    async actualizarUsuario(id: number,campo: CampoActualizable,valor: string, feriaId?: number) {
        const usuario = await this.obtenerUsuario(id);
        usuario[campo] = valor as any;
        if (campo === "ultimaInscripcion") {
            if (valor === "rechazado") {
                usuario.ultimaInscripcionFeriaId = feriaId;
            } else {
                // cuando se setea otro estado, clear the feria reference
                usuario.ultimaInscripcionFeriaId = undefined;
            }
        }
        return actualizarUsuarioRepo(usuario);
    }


    // async inscribirUsuarioAFeria(userId: number, feriaId: number) {
    //     const usuario = await usuarioRepo.findById(userId);
    //     const feria = await feriaRepo.findById(feriaId);

    //     if (!usuario || !feria) throw new Error("Usuario o Feria no existe");

    //     const inscripcion = new Inscripcion();
    //     inscripcion.usuario = usuario;
    //     inscripcion.feria = feria;

    //     return await inscripcionRepo.save(inscripcion);
    // }
}

export const usuarioService = new UsuarioService();
