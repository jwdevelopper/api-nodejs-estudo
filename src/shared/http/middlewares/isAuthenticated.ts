import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import authConfig from "../../../config/auth.config";
import AppError from "../../errors/AppError";

interface ITokenPayload {
    iat: number;
    exp: number;
    sub: string;
}

export default function isAuthenticated(req:Request,resp:Response,next:NextFunction): void {
    const authHeader = req.headers.authorization;
    if(!authHeader){
        throw new AppError('metodo de autenticação não enviado');
    }

    const [_,token] = authHeader.split(' ');

    try {
        const decodeToken = verify(token,authConfig.jwt.secret);
        const { sub } = decodeToken as ITokenPayload;
        req.user = {
            id:sub
        }
        return next();
    } catch {
        throw new AppError('Token invalido!');
    }
}