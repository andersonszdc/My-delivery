import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

@Entity("products")
export class Product {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at: Date;
}
