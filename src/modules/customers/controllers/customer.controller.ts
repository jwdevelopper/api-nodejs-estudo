import { Request, response, Response } from "express";
import { request } from "http";
import CreateCustomerService from "../services/create_customer.service";
import DeleteCustomerService from "../services/delete_customer.service";
import ListCustomerService from "../services/list_customer.service";
import ShowCustomerService from "../services/show_customer.service";
import UpdateCustomerService from "../services/update_customer.service";

export default class CustomersController {
    public async index(req:Request,resp:Response): Promise<Response> {
        const listCustomers = new ListCustomerService();
        const customers = await listCustomers.execute();
        return resp.json(customers);
    }

    public async show(req:Request, resp:Response): Promise<Response> {
        const { id } = req.params;

        const showCustomer = new ShowCustomerService();

        const customer = await showCustomer.execute({id});

        return resp.json(customer);
    }

    public async create(req:Request, resp:Response): Promise<Response> {
        const { name, email } = req.body;

        const createCustomer = new CreateCustomerService();

        const customer = await createCustomer.execute({
            name,
           email
        });

        return resp.json(customer);
    }

    public async update(req:Request, resp:Response): Promise<Response> {
        const { name, email } = req.body;
        const {id} = req.params;

        const updateCustomer = new UpdateCustomerService();

        const customer = await updateCustomer.execute({
            id,
            name,
            email
        });

        return resp.json(customer);
    }

    public async delete(req:Request, resp:Response): Promise<Response> {
        const {id} = req.params;
        const deleteCustomer = new DeleteCustomerService();

        await deleteCustomer.execute({id});

        return resp.json([]);
    }
}