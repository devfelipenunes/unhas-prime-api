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

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "root",
  database: "unhas_prime",
  synchronize: true,
  logging: false,
  entities: [User, Servico, Collaborator, Sale],
  migrations: [
    CreateCollaboratorTable1711998753405,
    CreateServicosTable1639440773224,
    CreateUsersTable1674307725393,
    CreateSaleTable1711998753405,
    AddTimestampsToSaleTable1639442700001,
  ],
  subscribers: [],
});
