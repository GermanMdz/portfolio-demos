export class Usuario {
    id?: number;
    nombre: string;
    email?: string;
    password?: string;
    role?: 'admin' | 'user';
    rubro?: string | undefined;
    ultimaInscripcion?: string;
    ultimaInscripcionFeriaId?: number | undefined;
    telefono?: string | undefined;
    createdAt?: Date;

    constructor(nombre: string) {
        this.nombre = nombre;
    }
}

export interface DatosUsuarioIncripcion{
    id: number;
    nombre: string;
    email: string;
    rubro: string;
    telefono: string;
    ultimaInscripcion: string;
    ultimaInscripcionFeriaId?: number;
    createdAt: Date;
}