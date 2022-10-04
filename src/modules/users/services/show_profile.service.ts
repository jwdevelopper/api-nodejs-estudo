import AppError from "../../../shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/user";
import UsersRepository from "../typeorm/repositories/users.repository";

interface IRequest {
    user_id: string;
}

class ShowProfileService {
    public async execute({user_id}: IRequest): Promise<User>{
        const userRepository = getCustomRepository(UsersRepository);
        
        const user = await userRepository.findById(user_id);

        if(!user){
            throw new AppError('Usuario inexistente');
        }

        return user;
    }
}

export default ShowProfileService;