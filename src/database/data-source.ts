import "reflect-metadata";
import { DataSource } from "typeorm";
import { CreateUsersTable1674307725393 } from "./migrations/1711993716221-CreateUsersTable";
import User from "../entities/User";
import { CreateServicosTable1639440773224 } from "./migrations/1711996309209-CreateServicoTable";
import Servico from "../entities/Servico";
import { CreateCollaboratorTable1711998753405 } from "./migrations/1711998753405-CreateCollaboratorTable";
import Sale from "../entities/Sale";
import { CreateSaleTable1711998753405 } from "./migrations/1712002938181-CreateSaleTable";
import Collaborator from "../entities/Collaborator";
import { AddTimestampsToSaleTable1639442700001 } from "./migrations/1712061489239-AddTimestampsToSaleTable";
import { AddPercentageColumnToCollaborator1711998753406 } from "./migrations/1712426251779-addPercentageColumn";
import { AddPaymentMethodToSaleTable1711998753406 } from "./migrations/1712426780067-addPaymentMethod";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "149.100.155.154",
  port: 3306,
  username: "u245073799_felipinhopeni",
  password: "12345678#Fe",
  database: "u245073799_felipetermuxga",
  synchronize: true,
  logging: false,
  entities: [User, Servico, Collaborator, Sale],
  migrations: [
    CreateCollaboratorTable1711998753405,
    CreateServicosTable1639440773224,
    CreateUsersTable1674307725393,
    CreateSaleTable1711998753405,
    AddTimestampsToSaleTable1639442700001,
    AddPercentageColumnToCollaborator1711998753406,
    AddPaymentMethodToSaleTable1711998753406,
  ],
  subscribers: [],
});
