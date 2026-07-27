import { DatosUsuarioIncripcion as usuario } from "../usuario/usuario";
import { usuarioService } from "../usuario/usuarioService";

export async function aplicarCaducidadRechazados() {
    // si el usuario fue rechazado no puede participar en la siguiente feria,
    // si el usuario estaba en proximo, ya puede participar
    const usuarios = await usuarioService.obtenerTodosUsuarios();
    const modificados: usuario[] = usuarios.reduce((acc: usuario[], u) => {
        if (u.ultimaInscripcion === "rechazado") {
            acc.push({ ...u, ultimaInscripcion: "proximo" } as usuario);
        } else if (u.ultimaInscripcion === "proximo") {
            acc.push({ ...u, ultimaInscripcion: "suplente" } as usuario);
        }
        return acc;
    }, []);
    
    return modificados;
}

export default aplicarCaducidadRechazados;