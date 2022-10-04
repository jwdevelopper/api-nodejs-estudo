import AppError from "../../../shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import UsersRepository from "../typeorm/repositories/users.repository";
import UserTokensRepository from "../typeorm/repositories/users_tokens.repository";
import EtherealMail from "../../../config/mail/ethereal.mail";
import path from 'path';

interface IRequest {
    email: string;
}


class SendForgotPasswordEmailService {
    public async execute({email}: IRequest): Promise<void>{
        const usersRepository = getCustomRepository(UsersRepository);
        const userTokensRepository = getCustomRepository(UserTokensRepository);
        
        const user = await usersRepository.findByEmail(email);
        if(!user){
            throw new AppError('Usuario não encontrado!');
        }

        const {token} = await userTokensRepository.generate(user.id);

        console.log(token);

        const forgotPasswordTemplate = path.resolve(__dirname, '..', 'views', 'forgot_password.hbs');

        await EtherealMail.sendMail({
            to: {
                name: user.name,
                email: user.email
            },
            subject: '[API Vendas] Recuperação de senha',
            templateData: {
                file: forgotPasswordTemplate,
                variables: {
                    name: user.name,
                    link: `http://localhost:3000/reset_password?token=${token}`
                }
            }
        });
    }
        
}

export default SendForgotPasswordEmailService;