import { Router } from "express";
import servicoRouter from "../controllers/servicosController";
import collaboratorRouter from "../controllers/CollaboratorController";
import saleRouter from "../controllers/SaleRepository";

const routers = Router();

routers.use("/servicos", servicoRouter);
routers.use("/collaborators", collaboratorRouter);
routers.use("/sales", saleRouter);

export default routers;
