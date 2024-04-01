import { AppDataSource } from "../database/data-source";
import Servico from "../entities/Servico";

const ServicoRepository = AppDataSource.getRepository(Servico);

const criarServico = async (nome: string, preco: number): Promise<Servico> => {
  const servico = new Servico();
  servico.nome = nome;
  servico.preco = preco;
  servico.count = 0;
  return ServicoRepository.save(servico);
};

const listarServicos = (): Promise<Servico[]> => {
  return ServicoRepository.find();
};

const atualizarServico = async (
  id: number,
  nome: string,
  preco: number
): Promise<Servico | null> => {
  const servico = await ServicoRepository.findOne({ where: { id } });
  if (servico) {
    servico.nome = nome;
    servico.preco = preco;
    await ServicoRepository.save(servico);
    return servico;
  }
  return null;
};

const excluirServico = async (id: number): Promise<boolean> => {
  const servico = await ServicoRepository.findOne({ where: { id } });
  if (servico) {
    await ServicoRepository.remove(servico);
    return true;
  }
  return false;
};

export default {
  criarServico,
  listarServicos,
  atualizarServico,
  excluirServico,
};
