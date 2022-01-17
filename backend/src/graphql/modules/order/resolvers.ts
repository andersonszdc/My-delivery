import { AddOrder, GetAllOrders } from "../../../services/Order";

export default {
  Query: {
    orders: async () => await GetAllOrders(),
  },
  Mutation: {
    addOrder: async (parent, arg) => {
      return await AddOrder(arg);
    },
  },
};
