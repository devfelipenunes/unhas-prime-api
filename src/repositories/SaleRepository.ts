import { AppDataSource } from "../database/data-source";
import Sale from "../entities/Sale";

const SaleRepository = AppDataSource.getRepository(Sale);

const createSale = async (
  collaboratorId: number,
  servicoId: number,
  paymentMethod: string
): Promise<Sale> => {
  const sale = new Sale();
  sale.collaboratorId = collaboratorId;
  sale.servicoId = servicoId;
  sale.paymentMethod = paymentMethod;

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

const getSalesByCollaboratorId = async (
  collaboratorId: number
): Promise<any[]> => {
  const sales = await SaleRepository.createQueryBuilder("sale")
    .innerJoinAndSelect("sale.collaborator", "collaborator")
    .innerJoinAndSelect("sale.servico", "servico")
    .select([
      "sale.id as sale_id",
      "sale.collaboratorId as collaborator_id",
      "collaborator.nome as collaborator_nome",
      "sale.servicoId as servico_id",
      "servico.nome as servico_nome",
      "servico.preco as servico_preco",
      "COUNT(sale.id) as servico_count",
      "sale.created_at as sale_created_at",
      "sale.updated_at as sale_updated_at",
    ])
    .where("sale.collaboratorId = :collaboratorId", { collaboratorId })
    .groupBy("sale.id")
    .getRawMany();

  return sales;
};

const getSalesByServiceId = (serviceId: number): Promise<Sale[]> => {
  return SaleRepository.find({ where: { servicoId: serviceId } });
};

export default {
  createSale,
  getSale,
  getSaleDetails,
  getSalesByCollaboratorId,
  getSalesByServiceId,
};
