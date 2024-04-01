import { AppDataSource } from "../database/data-source";
import User from "../entities/User";

const userRepository = AppDataSource.getRepository(User);

const getUsers = (): Promise<User[]> => {
  return userRepository.find();
};

export default { getUsers };
