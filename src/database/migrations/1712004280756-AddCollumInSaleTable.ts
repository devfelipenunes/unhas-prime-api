import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddTimestampsToTables1639442700000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Adicionar campos de timestamp na tabela 'sale'
    await queryRunner.addColumn(
      "sale",
      new TableColumn({
        name: "created_at",
        type: "timestamp",
        default: "CURRENT_TIMESTAMP",
      })
    );
    await queryRunner.addColumn(
      "sale",
      new TableColumn({
        name: "updated_at",
        type: "timestamp",
        default: "CURRENT_TIMESTAMP",
        onUpdate: "CURRENT_TIMESTAMP",
      })
    );

    // Adicionar campos de timestamp na tabela 'collaborator'
    await queryRunner.addColumn(
      "collaborator",
      new TableColumn({
        name: "created_at",
        type: "timestamp",
        default: "CURRENT_TIMESTAMP",
      })
    );
    await queryRunner.addColumn(
      "collaborator",
      new TableColumn({
        name: "updated_at",
        type: "timestamp",
        default: "CURRENT_TIMESTAMP",
        onUpdate: "CURRENT_TIMESTAMP",
      })
    );

    // Adicionar campos de timestamp na tabela 'servico'
    await queryRunner.addColumn(
      "servico",
      new TableColumn({
        name: "created_at",
        type: "timestamp",
        default: "CURRENT_TIMESTAMP",
      })
    );
    await queryRunner.addColumn(
      "servico",
      new TableColumn({
        name: "updated_at",
        type: "timestamp",
        default: "CURRENT_TIMESTAMP",
        onUpdate: "CURRENT_TIMESTAMP",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remover campos de timestamp na tabela 'sale'
    await queryRunner.dropColumn("sale", "created_at");
    await queryRunner.dropColumn("sale", "updated_at");

    // Remover campos de timestamp na tabela 'collaborator'
    await queryRunner.dropColumn("collaborator", "created_at");
    await queryRunner.dropColumn("collaborator", "updated_at");

    // Remover campos de timestamp na tabela 'servico'
    await queryRunner.dropColumn("servico", "created_at");
    await queryRunner.dropColumn("servico", "updated_at");
  }
}
