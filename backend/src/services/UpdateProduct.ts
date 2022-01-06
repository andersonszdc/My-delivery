import { getRepository } from "typeorm";
import { Product } from "../entities/Product";

const UpdateProduct = async ({ id, name, description, price }) => {
  const repo = getRepository(Product);

  const product = await repo.findOne(id);

  product.name = name ? name : product.name;
  product.description = description ? description : product.description;
  product.price = price ? price : product.price;

  await repo.save(product);

  return product;
};

export default UpdateProduct;
