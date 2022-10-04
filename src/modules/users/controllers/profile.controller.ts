import { Request, Response } from "express";
import UpdateProductService from "src/modules/products/services/update-product.service";
import ShowProfileService from "../services/show_profile.service";
import UpdateProfileService from "../services/update_profile.service";

export default class ProfileController {
    public async show(req:Request,resp:Response): Promise<Response> {
        const showProfile = new ShowProfileService();
        const user_id = req.user.id;
        const user = await showProfile.execute({user_id});

        return resp.json(user);
    }

    public async update(req:Request,resp:Response): Promise<Response> {
        const user_id = req.user.id;
        const {name,email,password, old_password} = req.body;
        const updateProfile = new UpdateProfileService();
        const user = await updateProfile.execute({
            user_id,
            name,
            email,
            password,
            old_password
        });
        return resp.json(user);
    }
}