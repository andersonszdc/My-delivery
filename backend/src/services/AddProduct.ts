import { pubsub } from "../graphql/modules/products/resolvers";
import { Product } from "../entities/Product";
import { getRepository } from "typeorm";

const AddProduct = async ({ name, description, price }) => {
  const repo = getRepository(Product);

  const product = repo.create({
    name,
    description,
    price
  });

  await repo.save(product);

  pubsub.publish("PRODUCT_ADDED", {
    productAdded: product,
  });

  return product;
};

export default AddProduct;
