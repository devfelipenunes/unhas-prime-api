import { Request, Response, Router } from "express";
import SaleRepository from "../repositories/SaleRepository";

const saleRouter = Router();

saleRouter.get(
  "/collaborator/:collaboratorId",
  async (req: Request, res: Response) => {
    try {
      const { collaboratorId } = req.params;
      const sales = await SaleRepository.getSalesByCollaboratorId(
        parseInt(collaboratorId, 10)
      );
      res.json(sales);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  }
);

saleRouter.get("/service/:serviceId", async (req: Request, res: Response) => {
  try {
    const { serviceId } = req.params;
    const sales = await SaleRepository.getSalesByServiceId(
      parseInt(serviceId, 10)
    );
    res.json(sales);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

saleRouter.get("/", async (_req: Request, res: Response) => {
  try {
    const sales = await SaleRepository.getSaleDetails();
    res.json(sales);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

saleRouter.put("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { paymentMethod, collaboratorId, servicoId } = req.body;
    const success = await SaleRepository.updateSale(
      parseInt(id, 10),
      paymentMethod,
      collaboratorId,
      servicoId
    );
    if (success) {
      res.json({ message: "Venda atualizada" });
    } else {
      res.status(404).json({ message: "Venda não encontrada" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

saleRouter.post("/", async (req: Request, res: Response) => {
  try {
    const { collaboratorId, servicoId, paymentMethod } = req.body;
    const sale = await SaleRepository.createSale(
      collaboratorId,
      servicoId,
      paymentMethod
    );
    res.json({ message: "Venda criada", sale });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

saleRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const success = await SaleRepository.deleteSale(parseInt(id, 10));
    if (success) {
      res.json({ message: "Venda excluída" });
    } else {
      res.status(404).json({ message: "Venda não encontrada" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export default saleRouter;
