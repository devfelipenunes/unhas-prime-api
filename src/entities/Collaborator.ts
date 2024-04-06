import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("collaborator")
class Collaborator {
  @PrimaryGeneratedColumn("increment")
  id?: number;

  @Column("varchar", { length: 100, nullable: false })
  nome: string;

  @Column("decimal", { precision: 10, scale: 2, nullable: false })
  percentage: number;
}

export default Collaborator;
