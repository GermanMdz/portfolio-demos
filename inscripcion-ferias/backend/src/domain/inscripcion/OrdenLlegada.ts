import { DatosUsuarioIncripcion as usuario } from "../usuario/usuario";
import { Criterio } from "./Criterio";
// import { ICriterioDeOrden } from "./ICriterioDeOrden";

export class OrdenLlegada extends Criterio {
    ordenar(u: usuario[]): usuario[] {
        const copia = [...u];
        copia.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
        return copia;
    }

}