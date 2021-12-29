import { getRepository } from "typeorm";
import { Product } from "../entities/Product";

const GetAllProducts = async () => {
  const repo = getRepository(Product);

  const products = await repo.find();

  return products;
};

export default GetAllProducts;
