import "reflect-metadata";
import { DataSource } from "typeorm";
import { CreateUsersTable1674307725393 } from "./migrations/1711993716221-CreateUsersTable";
import User from "../entities/User";
import { CreateServicosTable1639440773224 } from "./migrations/1711996309209-CreateServicoTable";
import Servico from "../entities/Servico";
import collaborator from "../entities/collaborator";
import { CreateCollaboratorTable1711998753405 } from "./migrations/1711998753405-CreateCollaboratorTable";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "root",
  database: "unhas_prime",
  synchronize: true,
  logging: false,
  entities: [User, Servico, collaborator],
  migrations: [
    CreateCollaboratorTable1711998753405,
    CreateServicosTable1639440773224,
    CreateUsersTable1674307725393,
  ],
  subscribers: [],
});
