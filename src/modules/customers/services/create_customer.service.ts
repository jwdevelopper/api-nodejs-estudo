import AppError from "../../../shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import Customer from "../typeorm/entities/Customer";
import CustomerRepository from "../typeorm/repositories/customers.repository";

interface IRequest {
    name: string;
    email: string;
}


class CreateCustomerService {
    public async execute({name,email}: IRequest): Promise<Customer>{
        const customerRepository = getCustomRepository(CustomerRepository);
        const emailExists = await customerRepository.findByEmail(email);
        if(emailExists){
            throw new AppError('Email ja cadastrado!');
        }


        const customer = customerRepository.create({
            name,
            email,
        });
        await customerRepository.save(customer);
        return customer;
    }
        
}

export default CreateCustomerService;