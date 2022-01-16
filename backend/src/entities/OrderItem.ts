import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";
import { Order } from "./Order";
import { Product } from "./Product";

@Entity()
export class OrderItem {
  @PrimaryColumn("uuid")
  id: string;

  @ManyToOne(() => Order)
  order: Order;

  @OneToOne(() => Product)
  @JoinColumn()
  product: Product;

  @Column("int")
  quantity: number;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
