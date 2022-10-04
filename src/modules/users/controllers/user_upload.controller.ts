import { Request, Response } from "express";
import CreateUserService from "../services/create_user.service";
import ListUserService from "../services/list_user.service";
import UploadUserAvatarService from "../services/upload_user_avatar.service";

export default class UserUploadController {

    public async upload(req:Request,resp:Response): Promise<Response> {
        const uploadAvatar = new UploadUserAvatarService();
        const user = uploadAvatar.execute({
            user_id: req.user.id,
            avatarFilename: req.file?.filename
        })

        return resp.json(user);
    }
}