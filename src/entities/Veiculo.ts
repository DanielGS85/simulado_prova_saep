import "reflect-metadata";
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
} from "typeorm";

import { OrdemDeServico } from "../entities/OrdenDeServico";

@Entity("veiculo")
export class Veiculo {
    @PrimaryGeneratedColumn()
    id_veiculo!: number;

    @Column({ type: "varchar", length: 255 })
    modelo!: string;

    @Column({ type: "varchar", length: 255 })
    marca!: string;

    @Column({ type: "varchar", length: 255 })
    placa!: string;

    @OneToMany(() => OrdemDeServico, (ordemDeServico) => ordemDeServico.veiculo)
    ordensDeServico!: OrdemDeServico[];
}