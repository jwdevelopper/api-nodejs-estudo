import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import routes from './routes';
import AppError from '../errors/AppError';
import '../../shared/typeorm';
import { errors } from 'celebrate';
import uploadConfig from '../../config/upload.config';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);
app.use(errors());
app.use((error:Error, req:Request, resp:Response, next:NextFunction) => {
    if(error instanceof AppError) {
        return resp.status(error.statusCode).json({
            status: 'error',
            message: error.message
        });
    }
    return resp.status(500).json({
        status: 'error',
        message: 'Internal Server Error'
    })
});

app.listen(3333, () => {
    console.log('Server em execução');
});