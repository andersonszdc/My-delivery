import { PubSub } from "graphql-subscriptions";
import { AddProduct, GetAllProducts, UpdateProduct } from "../../../services/Product";

export const pubsub = new PubSub();

export default {
  Query: {
    products: async () => await GetAllProducts(),
  },
  Mutation: {
    addProduct: async (parent, { name, description, price }) => {
      return await AddProduct({ name, description, price });
    },
    updateProduct: async (parent, { id, name, description, price }) => {
      return await UpdateProduct({ id, name, description, price });
    },
  },
  Subscription: {
    productAdded: {
      subscribe: () => pubsub.asyncIterator("PRODUCT_ADDED"),
    },
  },
};
