import { Request, Response, Router } from "express";
import ServicoRepository from "../repositories/ServicoRepository";

const servicoRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Serviços
 *   description: Endpoints para operações relacionadas a serviços
 */

/**
 * @swagger
 * /services:
 *   post:
 *     summary: Cria um novo serviço
 *     tags: [Serviços]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               preco:
 *                 type: number
 *     responses:
 *       200:
 *         description: Serviço criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '../entities/Servico.ts'
 */
servicoRouter.post("/", async (req: Request, res: Response) => {
  try {
    const { nome, preco } = req.body;
    const servico = await ServicoRepository.criarServico(nome, preco);
    res.json({ message: "Serviço criado", servico });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /services:
 *   get:
 *     summary: Retorna todos os serviços
 *     tags: [Serviços]
 *     responses:
 *       200:
 *         description: Lista de serviços
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '../entities/Servico.ts'
 */
servicoRouter.get("/", async (_req: Request, res: Response) => {
  try {
    const servicos = await ServicoRepository.listarServicos();
    res.json(servicos);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /services/{id}:
 *   put:
 *     summary: Atualiza um serviço existente
 *     tags: [Serviços]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do serviço a ser atualizado
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '../entities/Servico.ts'
 *     responses:
 *       200:
 *         description: Serviço atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '../entities/Servico.ts'
 */
servicoRouter.put("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { nome, preco } = req.body;
    const servicoId = parseInt(id, 10);
    const servico = await ServicoRepository.atualizarServico(
      servicoId,
      nome,
      preco
    );
    if (servico) {
      res.json({ message: "Serviço atualizado" });
    } else {
      res.status(404).json({ message: "Serviço não encontrado" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /services/{id}:
 *   delete:
 *     summary: Exclui um serviço existente
 *     tags: [Serviços]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do serviço a ser excluído
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Serviço excluído com sucesso
 *       404:
 *         description: Serviço não encontrado
 */
servicoRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const servicoId = parseInt(id, 10);
    const success = await ServicoRepository.excluirServico(servicoId);
    if (success) {
      res.status(204).json({ message: "Serviço excluído" }); // Retorna 204 No Content para indicar exclusão bem-sucedida
    } else {
      res.status(404).json({ message: "Serviço não encontrado" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export default servicoRouter;
