import Customer from "../../../customers/typeorm/entities/Customer";
import { CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import OrdersProduct from "./orders_products";

@Entity('orders')
class Order {
    @PrimaryGeneratedColumn('uuid')
    id:string;
    @ManyToOne(() => Customer)
    @JoinColumn({name: 'customer_id'})
    customer: Customer;
    @OneToMany(() => OrdersProduct, order_products => order_products.order, {cascade: true})
    order_products: OrdersProduct[];
    @CreateDateColumn()
    created_at: Date;
    @UpdateDateColumn()
    updated_at: Date;
}

export default Order;