import { DatosUsuarioIncripcion as usuario } from "../usuario/usuario";
import { Criterio } from "./Criterio";
import { OrdenLlegada } from "./OrdenLlegada";

export class PrioridadInicial extends Criterio {

    // Crea sublistas por estado de inscripcion y las concatena en orden de llegada
    ordenar(u: usuario[]): usuario[] {
        const criterio = new OrdenLlegada();

        const porEstado = (estado: string) => 
            criterio.ordenar(u.filter(user => user.ultimaInscripcion === estado));

        // el estado hace referencia a la ultima participacion de cada usuario
        return [
            ...porEstado("pendiente"), // son los que nunca participaros en una feria
            ...porEstado("suplente"),
            ...porEstado("confirmado"),
            ...porEstado("rechazado"),
        ];
    }

}

export class PrioridadRegenerada extends Criterio {

    // Crea sublistas por estado de inscripcion y las concatena en orden de llegada
    ordenar(u: usuario[]): usuario[] {
        const criterio = new OrdenLlegada();

        const porEstado = (estado: string) => 
            criterio.ordenar(u.filter(user => user.ultimaInscripcion === estado));

        return [
            ...porEstado("pendiente"),
            // al regenerar las listas el orden de confirmados y suplentes se invierte 
            ...porEstado("confirmado"),
            ...porEstado("suplente"),
            ...porEstado("rechazado"),
        ];
    }

    // al regenerar las listas, si se inscribio alguien que nunca participo se le permite participar y se sobrepasa el cupo maximo
    generarListados(u: usuario[], cupo: number) {
        const pendientes = u.filter(user => user.ultimaInscripcion === "pendiente");
        const confirmados = u.filter(user => user.ultimaInscripcion === "confirmado");
        const listaEspera = u.filter(user => user.ultimaInscripcion === "suplente");
        const rechazados = u.filter(user => user.ultimaInscripcion === "rechazado");
        const proximos = u.filter(user => user.ultimaInscripcion === "proximo");

        const aprobados = [...confirmados, ...pendientes];
        return { rechazados, aprobados, listaEspera, proximos }
    }

}