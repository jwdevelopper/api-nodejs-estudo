import { Request, response, Response } from "express";
import { request } from "http";
import CreateOrderService from "../services/create_order.service";
import ShowOrderService from "../services/show_order.service";

export default class OrdersController {
    

    public async show(req:Request, resp:Response): Promise<Response> {
        const { id } = req.params;

        const showOrder = new ShowOrderService();

        const order = await showOrder.execute({id});

        return resp.json(order);
    }

    public async create(req:Request, resp:Response): Promise<Response> {
        const { customer_id, products } = req.body;

        const createOrder = new CreateOrderService();

        const order = await createOrder.execute({
            customer_id,
            products
        });

        return resp.json(order);
    }
}