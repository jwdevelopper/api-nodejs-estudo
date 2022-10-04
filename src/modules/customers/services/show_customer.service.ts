import AppError from "../../../shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Customer from "../typeorm/entities/Customer";
import CustomerRepository from "../typeorm/repositories/customers.repository";

interface IRequest {
    id: string;
}

class ShowCustomerService {
    public async execute({id}: IRequest): Promise<Customer>{
        const customerRepository = getCustomRepository(CustomerRepository);
        
        const customer = await customerRepository.findById(id);

        if(!customer){
            throw new AppError('Cliente inexistente');
        }

        return customer;
    }
}

export default ShowCustomerService;