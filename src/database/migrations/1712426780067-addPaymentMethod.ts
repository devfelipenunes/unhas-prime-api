import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddPaymentMethodToSaleTable1711998753406
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "sale",
      new TableColumn({
        name: "paymentMethod",
        type: "varchar", // Defina o tipo de dado para uma string
        isNullable: true, // Defina se a coluna pode aceitar valores nulos ou não
        default: "",
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("sale", "paymentMethod");
  }
}
