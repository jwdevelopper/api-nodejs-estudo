import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/user";
import UsersRepository from "../typeorm/repositories/users.repository";

class ListUserService {
    public async execute(): Promise<User[]>{
        const userRepository = getCustomRepository(UsersRepository);
        
        const users = await userRepository.find();

        return users;
    }
}

export default ListUserService;