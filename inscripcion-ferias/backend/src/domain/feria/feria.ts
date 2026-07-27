export class Feria {
  id?: number;
  nombre: string;
  fecha?: Date | undefined;
  horaInicio?: string | undefined;
  horaFin?: string | undefined;
  direccion?: string | undefined;
  cupo?: number | undefined;
  createdAt?: Date | undefined;
  listasGeneradas?: boolean;

  constructor(nombre: string, fecha?: Date, inicio?: string, fin?: string, direccion?: string, cupo?: number) {
    if (!nombre || nombre.trim() === "") {
      throw new Error("El nombre de la feria no puede estar vacío");
    }
    this.nombre = nombre.trim();
    this.fecha = fecha;
    this.horaInicio = inicio;
    this.horaFin = fin;
    this.direccion = direccion;
    this.cupo = cupo;
    // this.createdAt = createdAt;
    // this.id = id;
  }
}
