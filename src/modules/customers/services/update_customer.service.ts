import { compare, hash } from "bcryptjs";
import AppError from "../../../shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import CustomerRepository from "../typeorm/repositories/customers.repository";
import Customer from "../typeorm/entities/Customer";

interface IRequest {
    id: string;
    name:string;
    email:string;
}

class UpdateCustomerService {
    public async execute({id,name,email}: IRequest): Promise<Customer>{
        const customerRepository = getCustomRepository(CustomerRepository);
        
        const customer = await customerRepository.findById(id);

        if(!customer){
            throw new AppError('Cliente inexistente');
        }

        const customerExists = await customerRepository.findByEmail(email);

        if(customerExists && email !== customer.email) {
            throw new AppError('Cliente ja existe!');
        }

        customer.name = name;
        customer.email = email;

        await customerRepository.save(customer);

        return customer;
    }
}

export default UpdateCustomerService;