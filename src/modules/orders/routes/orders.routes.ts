import { Router } from "express";
import { celebrate, Joi, Segments } from 'celebrate';
import OrdersController from "../controllers/orders.controller";
import isAuthenticated from "../../../shared/http/middlewares/isAuthenticated";

const orderRouter = Router();
const orderController = new OrdersController();

orderRouter.use(isAuthenticated);

orderRouter.get(
    '/:id', 
    celebrate({
        [Segments.PARAMS]: {
            id: Joi.string().uuid().required()
        }
    }),
    orderController.show
);

orderRouter.post('/',
 celebrate({
    [Segments.BODY]: {
        customer_id: Joi.string().uuid().required(),
        products: Joi.required()
    }
 }),
 orderController.create);



export default orderRouter;