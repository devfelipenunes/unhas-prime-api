import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddPercentageColumnToCollaborator1711998753406
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "collaborator",
      new TableColumn({
        name: "percentage",
        type: "int",
        isNullable: true,
        default: 0,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("collaborator", "percentage");
  }
}
