import "reflect-metadata";
import express from "express";
import cors from "cors";
import { AppDataSource } from "./database/data-source";
import routers from "./routes/routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(routers);

AppDataSource.initialize().then(async () => {
  console.log("Data Source has been initialized!");
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
});
