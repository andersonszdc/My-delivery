import { Order } from "../../../entities/Order";
import { AddOrder, GetAllOrders } from "../../../services/Order";

export default {
  Query: {
    orders: async () => await GetAllOrders(),
  },
  Mutation: {
    addOrder: async (_: any, args: Order) => {
      return await AddOrder(args);
    },
  },
};
