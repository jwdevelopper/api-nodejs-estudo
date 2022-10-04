import { Request, Response } from "express";
import CreateSessionService from "../services/create_session.service";

export default class SessionsController {
    public async create(req:Request, resp:Response): Promise<Response> {
        const {email,password} = req.body;

        const createSession = new CreateSessionService();

        const  user  = await createSession.execute({email,password});

        return resp.json(user);
    }
}