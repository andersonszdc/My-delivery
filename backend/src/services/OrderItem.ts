import { getRepository } from "typeorm";
import { OrderItem } from "../entities/OrderItem";

export const GetAllOrderItens = async () => {
  const repo = getRepository(OrderItem);

  const result = await repo.find();

  return result;
};

export const AddOrderItem = async (args: OrderItem) => {
  const repo = getRepository(OrderItem);

  const orderItem = repo.create(args);

  const result = await repo.save(orderItem);

  return result;
};
