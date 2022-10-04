import AppError from "../../../shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import User from "../typeorm/entities/user";
import UsersRepository from "../typeorm/repositories/users.repository";
import path from "path";
import uploadConfig from '../../../config/upload.config';
import fs from 'fs';

interface IRequest {
    user_id: string;
    avatarFilename: string | undefined;
}


class UploadUserAvatarService {
    public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
        const usersRepository = getCustomRepository(UsersRepository);
        const user = await usersRepository.findById(user_id);
        if (!user) {
            throw new AppError('User not found.');
        }
        if (user.avatar) {
            const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
            const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);
            if (userAvatarFileExists) {
                await fs.promises.unlink(userAvatarFilePath);
            }

        }
        if (avatarFilename) {
            user.avatar = avatarFilename;
        }
        await usersRepository.save(user);
        return user;
    }

}

export default UploadUserAvatarService;