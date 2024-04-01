import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddTimestampsToSaleTable1639442700000
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("sale", "created_at");
    await queryRunner.dropColumn("sale", "updated_at");
  }
}
