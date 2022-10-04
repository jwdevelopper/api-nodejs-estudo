import AppError from "../../../shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Order from "../typeorm/entities/order";
import { OrdersRepository } from "../typeorm/repositories/OrdersRepository";
import CustomerRepository from "../../customers/typeorm/repositories/customers.repository";
import { ProductRepository } from "../../products/typeorm/repositories/ProductsRepository";

interface IProduct {
    id: string;
    quantity: number;
}

interface IRequest {
    customer_id: string;
    products: IProduct[];
}


class CreateOrderService {
    public async execute({customer_id,products}: IRequest): Promise<Order>{
        const ordersRepository = getCustomRepository(OrdersRepository);
        const customerRepository = getCustomRepository(CustomerRepository);
        const productRepository = getCustomRepository(ProductRepository);
        
        const customerExists = await customerRepository.findById(customer_id);
        
        if(!customerExists){
            throw new AppError('Cliente inexistente!');
        }

        const existsProducts = await productRepository.findAllByIds(products);

        if(!existsProducts.length) {
            throw new AppError('Produtos inexistentes!');
        }

        const existsProductsIds = existsProducts.map((product) => product.id);

        const checkInexistentProducts = products.filter(
            product => !existsProductsIds.includes(product.id)
        );

        if(checkInexistentProducts.length) {
            throw new AppError(`Produtos não encontrados ${checkInexistentProducts[0].id}`);
        }

        const quantityAvailable = products.filter(
            product => existsProducts.filter(
                p => p.id === product.id
            )[0].quantity < product.quantity
        );

        if(quantityAvailable.length) {
            throw new AppError(`A quantidade em estoque ${quantityAvailable[0].quantity} 
            não é suficiente ${quantityAvailable[0].id}`);
        }

        const serializeProducts = products.map(
            product => ({
                product_id: product.id,
                quantity: product.quantity,
                price: existsProducts.filter(p => p.id === product.id)[0].price
            })
        );

        const order = await ordersRepository.createOrder({
            customer: customerExists,
            products: serializeProducts
        });

        const {order_products} = order;

        const updatedProductQunatity = order_products.map(
            product => ({
                id: product.product_id,
                quantity: existsProducts.filter(p => p.id === product.product_id)[0].quantity - product.quantity
            })
        );

        await productRepository.save(updatedProductQunatity);

        return order;
    }
}

export default CreateOrderService;