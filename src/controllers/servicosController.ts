import { Request, Response, Router } from "express";
import ServicoRepository from "../repositories/ServicoRepository";

const servicoRouter = Router();

servicoRouter.get("/", async (_req: Request, res: Response) => {
  try {
    const servicos = await ServicoRepository.listarServicos();
    res.json(servicos);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

servicoRouter.post("/", async (req: Request, res: Response) => {
  try {
    const { nome, preco } = req.body;
    const servico = await ServicoRepository.criarServico(nome, preco);
    res.json(servico);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

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
      res.json({ message: "Serviço atulizado" });
    } else {
      res.status(404).json({ message: "Serviço não encontrado" });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

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
