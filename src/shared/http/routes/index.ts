import { Router } from "express";
import usersRouter from "../../../modules/users/routes/users.routes";
import productRouter from "../../../modules/products/routes/products.routes";
import sessionsRouter from "../../../modules/users/routes/sessions.routes";
import passwordRouter from "../../../modules/users/routes/password.routes";
import profileRouter from "../../../modules/users/routes/profile.routes";
import customersRouter from "../../../modules/customers/routes/customers.routes";
import orderRouter from "../../../modules/orders/routes/orders.routes";

const routes = Router();

routes.use('/products', productRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);
routes.use('/customers', customersRouter);
routes.use('/orders', orderRouter);


export default routes;