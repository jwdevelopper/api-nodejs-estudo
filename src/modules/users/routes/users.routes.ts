import { celebrate, Joi, Segments } from "celebrate";
import { Router } from "express";
import uploadConfig from "../../../config/upload.config";
import UserController from "../controllers/user.controller";
import isAuthenticated from "../../../shared/http/middlewares/isAuthenticated";
import UserUploadController from "../controllers/user_upload.controller";
import multer from "multer";

const usersRouter = Router();
const userController = new UserController();
const userUploadController = new UserUploadController();

const upload = multer(uploadConfig);


usersRouter.get('/',isAuthenticated,userController.index);

usersRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().required()
        }
    }),
    userController.create
);

usersRouter.patch(
    '/avatar',
    isAuthenticated,
    upload.single('avatar'),
    userUploadController.upload
);

export default usersRouter;