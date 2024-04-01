import { AppDataSource } from "../database/data-source";
import Sale from "../entities/Sale";

const SaleRepository = AppDataSource.getRepository(Sale);

const createSale = async (
  collaboratorId: number,
  servicoId: number
): Promise<Sale> => {
  const sale = new Sale();
  sale.collaboratorId = collaboratorId;
  sale.servicoId = servicoId;
  return SaleRepository.save(sale);
};

const getSale = (): Promise<Sale[]> => {
  return SaleRepository.find();
};

const getSaleDetails = () => {
  return SaleRepository.createQueryBuilder("sale")
    .innerJoinAndSelect("sale.collaborator", "collaborator")
    .innerJoinAndSelect("sale.servico", "servico")
    .select([
      "sale.id",
      "sale.created_at as sale_created_at",
      "sale.updated_at as sale_updated_at",
      "collaborator",
      "servico",
    ])
    .getRawMany();
};

export default { createSale, getSale, getSaleDetails };
