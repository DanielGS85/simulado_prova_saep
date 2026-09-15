import "reflect-metadata";
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
  } from "typeorm";
  
  import { Veiculo } from "../entities/Veiculo";
  
  @Entity("ordem_de_servico")
  export class OrdemDeServico {
    @PrimaryGeneratedColumn()
    id_ordem!: number;
  
    @Column()
    id_veiculo!: number;
  
    @Column({ type: "time" })
    data_entrada!: string;
  
    @Column({ type: "time", nullable: true })
    data_saida!: string;
  
    @Column({ type: "varchar", length: 255, nullable: true })
    servicos!: string;
  
    @ManyToOne(() => Veiculo, (veiculo) => veiculo.ordensDeServico)
    @JoinColumn({ name: "id_veiculo" })
    veiculo: Veiculo;
  }