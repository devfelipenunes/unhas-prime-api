import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("servico")
class Servico {
  @PrimaryGeneratedColumn("increment")
  id?: number;

  @Column("varchar", { length: 100, nullable: false })
  nome: string;

  @Column("varchar", { length: 100, nullable: false })
  preco: number;

  @Column()
  count: number;
}

export default Servico;
