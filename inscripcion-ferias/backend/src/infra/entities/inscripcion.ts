import { Entity, Column, ManyToOne, JoinColumn, CreateDateColumn, PrimaryColumn } from "typeorm";
import { UsuarioEntity } from "./usuarioEntity";
import { FeriaEntity } from "./feriaEntity";

@Entity({ name: "inscripcion" })
export class InscripcionEntity {
  @PrimaryColumn({ name: "usuario_id" })
  usuarioId!: number;

  @PrimaryColumn({ name: "feria_id" })
  feriaId!: number;

  @ManyToOne(() => UsuarioEntity)
  @JoinColumn({ name: "usuario_id" })
  usuario!: UsuarioEntity;

  @ManyToOne(() => FeriaEntity)
  @JoinColumn({ name: "feria_id" })
  feria!: FeriaEntity;

  @Column({ type: "enum", enum: ["pendiente", "confirmado", "suplente", "rechazado"], default: "pendiente" })
  estado!: "pendiente" | "confirmado" | "suplente" | "rechazado";

  @CreateDateColumn({ type: "timestamptz" })
  createdAt!: Date;
}
