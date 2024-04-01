import { Request, Response, Router } from "express";
import SaleRepository from "../repositories/SaleRepository";

const saleRouter = Router();

saleRouter.get("/", async (_req: Request, res: Response) => {
  try {
    const sales = await SaleRepository.getSaleDetails();
    res.json(sales);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

saleRouter.post("/", async (req: Request, res: Response) => {
  try {
    const { collaboratorId, servicoId } = req.body;
    const sale = await SaleRepository.createSale(collaboratorId, servicoId);
    res.json(sale);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export default saleRouter;
