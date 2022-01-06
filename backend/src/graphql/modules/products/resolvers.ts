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
