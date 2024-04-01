import Collaborator from "../entities/collaborator";
import { AppDataSource } from "../database/data-source";

const CollaboratorRepository = AppDataSource.getRepository(Collaborator);

const createCollaborator = (nome: string): Promise<Collaborator> => {
  const collaborator = new Collaborator();
  collaborator.nome = nome;
  return CollaboratorRepository.save(collaborator);
};

const getCollaborator = (): Promise<Collaborator[]> => {
  return CollaboratorRepository.find();
};

const updateCollaborator = async (
  id: number,
  nome: string
): Promise<Collaborator | null> => {
  const collaborator = await CollaboratorRepository.findOne({ where: { id } });
  if (collaborator) {
    collaborator.nome = nome;
    await CollaboratorRepository.save(collaborator);
    return collaborator;
  }
  return null;
};

const deleteCollaborator = async (id: number): Promise<boolean> => {
  const collaborator = await CollaboratorRepository.findOne({ where: { id } });
  if (collaborator) {
    await CollaboratorRepository.remove(collaborator);
    return true;
  }
  return false;
};

export default {
  createCollaborator,
  getCollaborator,
  updateCollaborator,
  deleteCollaborator,
};