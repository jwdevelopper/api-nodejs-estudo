import AppError from "../../../shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Order from "../typeorm/entities/order";
import { OrdersRepository } from "../typeorm/repositories/OrdersRepository";

interface IProduct {
    id: string;
    quantity: number;
}

interface IRequest {
    id: string;
}


class ShowOrderService {
    public async execute({id}: IRequest): Promise<Order>{
        const ordersRepository = getCustomRepository(OrdersRepository);
        
        const order = await ordersRepository.findById(id);
        
        if(!order){
            throw new AppError('Ordem inexistente!');
        }

        return order;
    }
}

export default ShowOrderService;