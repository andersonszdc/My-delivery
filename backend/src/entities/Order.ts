import { Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity()
export class Order {
  @PrimaryColumn("uuid")
  id: string;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
