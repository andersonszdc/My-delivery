import { getRepository } from "typeorm";
import { Product } from "../entities/Product";

const AddProduct = async ({ name, description }) => {
  const repo = getRepository(Product);

  const product = repo.create({
    name,
    description,
  });

  await repo.save(product);

  return product;
};

export default AddProduct;
