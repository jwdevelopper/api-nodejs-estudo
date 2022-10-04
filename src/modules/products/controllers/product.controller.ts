import { Request, response, Response } from "express";
import { request } from "http";
import CreateProductService from "../services/create-product.service";
import DeleteProductService from "../services/delete-product.service";
import ListProductService from "../services/list-product.service";
import ShowProductService from "../services/show-product.service";
import UpdateProductService from "../services/update-product.service";

export default class ProductsController {
    public async index(req:Request,resp:Response): Promise<Response> {
        const listProducts = new ListProductService();
        const products = await listProducts.execute();
        return resp.json(products);
    }

    public async show(req:Request, resp:Response): Promise<Response> {
        const { id } = req.params;

        const showProduct = new ShowProductService();

        const product = await showProduct.execute({id});

        return resp.json(product);
    }

    public async create(req:Request, resp:Response): Promise<Response> {
        const { name, price, quantity } = req.body;

        const createProduct = new CreateProductService();

        const product = await createProduct.execute({
            name,
            price,
            quantity
        });

        return resp.json(product);
    }

    public async update(req:Request, resp:Response): Promise<Response> {
        const { name, price, quantity } = req.body;
        const {id} = req.params;

        const updateProduct = new UpdateProductService();

        const product = await updateProduct.execute({
            id,
            name,
            price,
            quantity
        });

        return resp.json(product);
    }

    public async delete(req:Request, resp:Response): Promise<Response> {
        const {id} = req.params;
        const deleteProduct = new DeleteProductService();

        await deleteProduct.execute({id});

        return resp.json([]);
    }
}