import AddProduct from "../../../services/AddProduct";
import GetAllProducts from "../../../services/GetAllProducts";

export default {
  Query: {
    products: async () => await GetAllProducts(),
  },
  Mutation: {
    addProduct: async (_, { name, description }) =>
      await AddProduct({ name, description }),
  },
};
