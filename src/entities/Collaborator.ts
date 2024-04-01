import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("collaborator")
class Collaborator {
  @PrimaryGeneratedColumn("increment")
  id?: number;

  @Column("varchar", { length: 100, nullable: false })
  nome: string;
}

export default Collaborator;
