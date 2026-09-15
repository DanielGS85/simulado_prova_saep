import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Veiculo } from "../entities/Veiculo";

@Entity("cliente")
export class Cliente {
  @PrimaryGeneratedColumn()
  id_cliente!: number;

  @Column({ type: "varchar", length: 255 })
  nome!: string;

  @Column({ type: "char", length: 11 })
  cpf!: string;

  @Column({ type: "varchar", length: 20 })
  telefone!: string;

  @OneToMany(() => Veiculo, (veiculo) => veiculo.cliente)
  veiculos!: Veiculo[];
}