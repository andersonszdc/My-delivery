import { getRepository } from "typeorm";
import { Product } from "../entities/Product";
import { pubsub } from "../graphql/modules/products/resolvers";

export const AddProduct = async ({ name, description, price }) => {
  const repo = getRepository(Product);

  const product = repo.create({
    name,
    description,
    price,
  });

  await repo.save(product);

  pubsub.publish("PRODUCT_ADDED", {
    productAdded: product,
  });

  return product;
};

//

export const GetAllProducts = async () => {
  const repo = getRepository(Product);

  const products = await repo.find();

  return products;
};

//

export const UpdateProduct = async ({ id, name, description, price }) => {
  const repo = getRepository(Product);

  const product = await repo.findOne(id);

  product.name = name ? name : product.name;
  product.description = description ? description : product.description;
  product.price = price ? price : product.price;

  await repo.save(product);

  return product;
};
