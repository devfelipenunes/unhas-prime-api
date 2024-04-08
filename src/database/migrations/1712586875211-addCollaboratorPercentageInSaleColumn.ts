import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddCollaboratorPercentageInSaleColumn1712586875211
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "sale",
      new TableColumn({
        name: "collaborator_percentage",
        type: "varchar",
        isNullable: true,
        default: "",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("sale", "collaborator_percentage");
  }
}
