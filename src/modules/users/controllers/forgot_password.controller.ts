import { Request, Response } from "express";
import { send } from "process";
import SendForgotPasswordEmailService from "../services/send_forgot_password_email.service";

export default class ForgotPasswordController {

    public async create(req:Request,resp:Response): Promise<Response> {
        const {email} = req.body;
        const sendForgotPasswordEmail = new SendForgotPasswordEmailService();
         await sendForgotPasswordEmail.execute({
            email,
        });
        return resp.status(204).json();
    }
}