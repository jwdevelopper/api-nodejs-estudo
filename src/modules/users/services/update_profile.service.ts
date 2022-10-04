import { compare, hash } from "bcryptjs";
import AppError from "../../../shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/user";
import UsersRepository from "../typeorm/repositories/users.repository";

interface IRequest {
    user_id: string;
    name:string;
    email:string;
    password?:string;
    old_password?: string;
}

class UpdateProfileService {
    public async execute({user_id,name,email,password,old_password}: IRequest): Promise<User>{
        const userRepository = getCustomRepository(UsersRepository);
        
        const user = await userRepository.findById(user_id);

        if(!user){
            throw new AppError('Usuario inexistente');
        }

        const userUpdateEmail = await userRepository.findByEmail(email);

        if(userUpdateEmail && userUpdateEmail.id !== user.id) {
            throw new AppError('Usuario ja existe!');
        }

        if(password && !old_password){
            throw new AppError('A senha antiga é obrigatória')
        }

        if(password && old_password) {
            const checkOldPassword = await compare(old_password,user.password);

            if(!checkOldPassword){
                throw new AppError('Senha antiga não confere!');
            }

            user.password = await hash(password,8);
        }

        user.name = name;
        user.email = email;

        await userRepository.save(user);

        return user;
    }
}

export default UpdateProfileService;