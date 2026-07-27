export class Inscripcion {
  usuarioId?: number;
  feriaId?: number;
  estado?: "pendiente" | "confirmado" | "suplente" | "rechazado";
  createdAt?: Date | undefined;

  constructor(usuarioId: number, feriaId:number) {
    this.usuarioId = usuarioId;
    this.feriaId = feriaId;
  }
}


