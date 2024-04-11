import { Request, Response, Router } from "express";
import CollaboratorRepository from "../repositories/CollaboratorRepository";

const collaboratorRouter = Router();

/**
 * @swagger
 * tags:
 *   name: Colaboradores
 *   description: Endpoints para operações relacionadas a vendas
 */

/**
 * @swagger
 * /collaborators:
 *   post:
 *     summary: Cria um novo colaborador
 *     tags: [Colaboradores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               percentage:
 *                 type: number
 *     responses:
 *       200:
 *         description: Colaborador criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Collaborator'
 */
collaboratorRouter.get("/", async (_req: Request, res: Response) => {
  try {
    const collaborator = await CollaboratorRepository.getCollaborator();
    res.json(collaborator);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /collaborators:
 *   get:
 *     summary: Retorna todos os colaboradores
 *     tags: [Colaboradores]
 *     responses:
 *       200:
 *         description: Lista de colaboradores
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Collaborator'
 */
collaboratorRouter.post("/", async (req, res) => {
  try {
    const { nome, percentage } = req.body;
    const collaborator = await CollaboratorRepository.createCollaborator(
      nome,
      percentage
    );
    res.json({ message: "Colaborador criado", collaborator });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /collaborators/{id}:
 *   put:
 *     summary: Atualiza um colaborador existente
 *     tags: [Colaboradores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do colaborador a ser atualizado
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Collaborator'
 *     responses:
 *       200:
 *         description: Colaborador atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '../entities/Collaborator.ts'
 */
collaboratorRouter.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, percentage } = req.body;
    const collaboratorId = parseInt(id, 10);
    const collaborator = await CollaboratorRepository.updateCollaborator(
      collaboratorId,
      nome,
      percentage
    );
    if (collaborator) {
      res.json({ message: "Colaborador atualizado" });
    } else {
      res.status(404).json({ message: "Colaborador não encontrado" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * @swagger
 * /collaborators/{id}:
 *   delete:
 *     summary: Exclui um colaborador existente
 *     tags: [Colaboradores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do colaborador a ser excluído
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Colaborador excluído com sucesso
 */
collaboratorRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const collaboratorId = parseInt(id, 10);
    const success = await CollaboratorRepository.deleteCollaborator(
      collaboratorId
    );
    if (success) {
      res.status(204).json({ message: "Colaborador excluído" });
    } else {
      res.status(404).json({ message: "Colaborador não encontrado" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

export default collaboratorRouter;
