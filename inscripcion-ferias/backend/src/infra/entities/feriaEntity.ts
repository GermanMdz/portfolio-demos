import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity({ name: "feria" })
export class FeriaEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;

  @Column({ nullable: true })
  fecha!: string;

  @Column({ nullable: true })
  horaInicio!: string;

  @Column({ nullable: true })
  horaFin!: string;

  @Column({ nullable: true })
  direccion!: string;

  @Column({ nullable: true })
  cupo!: number;

  @Column({default: false})
  listasGeneradas!: boolean

  @CreateDateColumn({ type: "timestamptz" })
  createdAt!: Date;
}
