import Product from "../../../products/typeorm/entities/Product";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Order from "./order";

@Entity('orders_products')
class OrdersProduct {
    @PrimaryGeneratedColumn('uuid')
    id:string;
    @ManyToOne(() => Order, order => order.order_products)
    @JoinColumn({name: 'order_id'})
    order: Order;
    @ManyToOne(() => Product, product => product.order_products)
    @JoinColumn({name: 'product_id'})
    product: Product;
    @Column()
    order_id: string;
    @Column()
    product_id: string;
    @Column('decimal')
    price:number;
    @Column('int')
    quantity: number;
    @CreateDateColumn()
    created_at: Date;
    @UpdateDateColumn()
    updated_at: Date;
}

export default OrdersProduct;