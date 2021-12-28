import GetAllProducts from "../../../services/GetAllProducts";

export default {
  Query: {
    products: async () => await GetAllProducts(),
  },
};
