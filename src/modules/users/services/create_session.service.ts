import AppError from "../../../shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/user";
import UsersRepository from "../typeorm/repositories/users.repository";
import { compare, hash } from "bcryptjs";
import { sign } from "jsonwebtoken";
import authConfig from "../../../config/auth.config";

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: User;
    token: string;
}

class CreateSessionService {
    public async execute({email,password}: IRequest): Promise<IResponse>{
        const usersRepository = getCustomRepository(UsersRepository);
        const userExists = await usersRepository.findByEmail(email);
        if(!userExists){
            throw new AppError('Email/Senha incorreto!', 401);
        }

        const passwordConfirmed = await compare(password, userExists.password); 

        if(!passwordConfirmed){
            throw new AppError('Emai/Senha incorreto!', 401);
        }

        //nodejstypeorm
        const token = sign({}, authConfig.jwt.secret, {
            subject: userExists.id,
            expiresIn: authConfig.jwt.expiresIn
        });
       
        return {user:userExists,token};
    }
        
}

export default CreateSessionService;