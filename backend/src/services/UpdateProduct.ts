import { getRepository } from "typeorm";
import { Product } from "../entities/Product";

const UpdateProduct = async ({ id, name, description }) => {
  const repo = getRepository(Product);

  const product = await repo.findOne(id);

  product.name = name ? name : product.name;
  product.description = description ? description : product.description;

  await repo.save(product);

  return product;
};

export default UpdateProduct;