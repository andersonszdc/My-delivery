import { PubSub } from "graphql-subscriptions";
import AddProduct from "../../../services/AddProduct";
import GetAllProducts from "../../../services/GetAllProducts";
import UpdateProduct from "../../../services/UpdateProduct";

export const pubsub = new PubSub();

export default {
  Query: {
    products: async () => await GetAllProducts(),
  },
  Mutation: {
    addProduct: async (_, { name, description }) => {
      return await AddProduct({ name, description });
    },
    updateProduct: async (_, { id, name, description }) => {
      return await UpdateProduct({ id, name, description });
    },
  },
  Subscription: {
    productAdded: {
      subscribe: () => pubsub.asyncIterator("PRODUCT_ADDED"),
    },
  },
};
