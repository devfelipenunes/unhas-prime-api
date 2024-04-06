import { Request, Response, Router } from "express";
import CollaboratorRepository from "../repositories/CollaboratorRepository";

const collaboratorRouter = Router();

collaboratorRouter.get("/", async (_req: Request, res: Response) => {
  try {
    const collaborator = await CollaboratorRepository.getCollaborator();
    res.json(collaborator);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

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
