import { Request, Response, Router } from "express";
import SaleRepository from "../repositories/SaleRepository";

const saleRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Sale
 *   description: Endpoints para operações relacionadas a vendas
 */

/**
 * @swagger
 * /sales:
 *   post:
 *     summary: Cria uma nova venda
 *     tags: [Sale]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               collaboratorId:
 *                 type: number
 *               servicoId:
 *                 type: number
 *               paymentMethod:
 *                 type: string
 *               collaboratorPercentage:
 *                 type: string
 *     responses:
 *       200:
 *         description: Venda criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 sale:
 *                   $ref: '#/components/schemas/Sale'
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
saleRouter.post("/", async (req: Request, res: Response) => {
  try {
    const { collaboratorId, servicoId, paymentMethod, collaboratorPercentage } =
      req.body;
    const sale = await SaleRepository.createSale(
      collaboratorId,
      servicoId,
      paymentMethod,
      collaboratorPercentage
    );
    res.json({ message: "Venda criada", sale });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /sales/collaborator/{collaboratorId}:
 *   get:
 *     summary: Retorna todas as vendas de um colaborador específico
 *     tags: [Sale]
 *     parameters:
 *       - in: path
 *         name: collaboratorId
 *         required: true
 *         description: ID do colaborador
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de vendas do colaborador
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '../entities/Sale.ts'
 */
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

/**
 * @swagger
 * /sales:
 *   get:
 *     summary: Retorna detalhes de todas as vendas
 *     tags: [Sale]
 *     responses:
 *       200:
 *         description: Detalhes das vendas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   sale_iid:
 *                     type: number
 *                   sale_created_at:
 *                     type: string
 *                   sale_updated_at:
 *                     type: string
 *                   paymentMethod:
 *                     type: string
 *                   collaborator_percentage:
 *                     type: string
 *                   collaborator:
 *                     type: object
 *                   servico:
 *                     type: object
 */
saleRouter.get("/", async (_req: Request, res: Response) => {
  try {
    const sales = await SaleRepository.getSaleDetails();
    res.json(sales);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /sales/{id}:
 *   put:
 *     summary: Atualiza uma venda existente
 *     tags: [Sale]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da venda a ser atualizada
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Sale'
 *     responses:
 *       200:
 *         description: Venda atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *
 *               $ref: '#/components/schemas/Sale'
 */
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

/**
 * @swagger
 * /sales/{id}:
 *   delete:
 *     summary: Exclui uma venda existente
 *     tags: [Sale]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID da venda a ser excluída
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Venda excluída com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       404:
 *         description: Venda não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
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
