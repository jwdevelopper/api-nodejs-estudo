import { Request, Response } from "express";
import ResetPasswordService from "../services/reset_password.service";

export default class ResetPasswordController {

    public async create(req:Request,resp:Response): Promise<Response> {
        const {password,token} = req.body;
        const resetPassword = new ResetPasswordService();
         await resetPassword.execute({
            password,
            token,
        });
        return resp.status(204).json();
    }
}