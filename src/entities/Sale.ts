import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
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

  @Column({ name: "paymentMethod", nullable: false })
  paymentMethod: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}

export default Sale;
