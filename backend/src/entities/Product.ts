import { Column, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity()
export class Product {
  @PrimaryColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column("decimal", { precision: 5, scale: 2 })
  price: number;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
