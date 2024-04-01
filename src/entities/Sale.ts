import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";

import Servico from "./Servico";
import Collaborator from "./Collaborator";

@Entity("sale")
class Sale {
  @PrimaryGeneratedColumn("increment")
  id?: number;

  @Column({ name: "collaborator_id", nullable: false })
  collaboratorId: number;

  @ManyToOne(() => Collaborator)
  @JoinColumn({ name: "collaborator_id" })
  collaborator: Collaborator;

  @Column({ name: "servico_id", nullable: false })
  servicoId: number;

  @ManyToOne(() => Servico)
  @JoinColumn({ name: "servico_id" })
  servico: Servico;
}

export default Sale;
