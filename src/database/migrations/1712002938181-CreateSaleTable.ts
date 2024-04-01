import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from "typeorm";

export class CreateSaleTable1711998753405 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Adicionar a coluna 'collaboratorId' à tabela 'sale'
    await queryRunner.addColumn(
      "sale",
      new TableColumn({
        name: "collaboratorId",
        type: "int",
        isNullable: false,
      })
    );

    // Adicionar a chave estrangeira para 'collaboratorId'
    await queryRunner.createForeignKey(
      "sale",
      new TableForeignKey({
        columnNames: ["collaboratorId"],
        referencedColumnNames: ["id"],
        referencedTableName: "collaborator",
        onDelete: "CASCADE",
      })
    );

    // Adicionar a coluna 'servicoId' à tabela 'sale'
    await queryRunner.addColumn(
      "sale",
      new TableColumn({
        name: "servicoId",
        type: "int",
        isNullable: false,
      })
    );

    // Adicionar a chave estrangeira para 'servicoId'
    await queryRunner.createForeignKey(
      "sale",
      new TableForeignKey({
        columnNames: ["servicoId"],
        referencedColumnNames: ["id"],
        referencedTableName: "servico",
        onDelete: "CASCADE",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remover a chave estrangeira 'servicoId'
    await queryRunner.dropForeignKey("sale", "servicoId");

    // Remover a coluna 'servicoId' da tabela 'sale'
    await queryRunner.dropColumn("sale", "servicoId");

    // Remover a chave estrangeira 'collaboratorId'
    await queryRunner.dropForeignKey("sale", "collaboratorId");

    // Remover a coluna 'collaboratorId' da tabela 'sale'
    await queryRunner.dropColumn("sale", "collaboratorId");
  }
}
