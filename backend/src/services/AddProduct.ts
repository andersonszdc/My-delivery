import { PubSub } from "graphql-subscriptions";
import { getRepository } from "typeorm";
import { Product } from "../entities/Product";
import { pubsub } from "../graphql/modules/products/resolvers";

const AddProduct = async ({ name, description }) => {
  const repo = getRepository(Product);

  const product = repo.create({
    name,
    description,
  });

  await repo.save(product);

  pubsub.publish("PRODUCT_ADDED", {
    productAdded: product,
  });

  return product;
};

export default AddProduct;
