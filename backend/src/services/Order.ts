import { getRepository } from "typeorm";
import { Order } from "../entities/Order";

export const GetAllOrders = async () => {
  const repo = getRepository(Order);

  const result = await repo.find();

  return result;
};

export const AddOrder = async (info) => {
  const repo = getRepository(Order);

  const order = repo.create(info);

  const result = await repo.save(order);

  return result;
};
