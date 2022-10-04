import { Request, Response } from "express";
import CreateUserService from "../services/create_user.service";
import ListUserService from "../services/list_user.service";

export default class UserController {
    public async index(req:Request,resp:Response): Promise<Response> {
        const listUser = new ListUserService();
        console.log(req.user.id);
        const users = await listUser.execute();

        return resp.json(users);
    }

    public async create(req:Request,resp:Response): Promise<Response> {
        const {name,email,password} = req.body;
        const createUser = new CreateUserService();
        const user = await createUser.execute({
            name,
            email,
            password
        });
        return resp.json(user);
    }
}