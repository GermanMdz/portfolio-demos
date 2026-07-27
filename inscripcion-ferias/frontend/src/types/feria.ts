export interface Feria {
  id?: number;
  nombre: string;
  direccion: string;
  fecha: string;
  horaInicio: string,
  horaFin: string,
  cupo: number;
  listasGeneradas?: boolean;
}
