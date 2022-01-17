import { PubSub } from "graphql-subscriptions";
import { Product } from "../../../entities/Product";
import {
  AddProduct,
  GetAllProducts,
  UpdateProduct,
} from "../../../services/Product";

export const pubsub = new PubSub();

export default {
  Query: {
    products: async () => await GetAllProducts(),
  },
  Mutation: {
    addProduct: async (_: any, arg: Product) => {
      return await AddProduct(arg);
    },
    updateProduct: async (_: any, arg: Product) => {
      return await UpdateProduct(arg);
    },
  },
  Subscription: {
    productAdded: {
      subscribe: () => pubsub.asyncIterator("PRODUCT_ADDED"),
    },
  },
};
