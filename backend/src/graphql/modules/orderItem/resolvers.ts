import { OrderItem } from "../../../entities/OrderItem";
import { AddOrderItem, GetAllOrderItens } from "../../../services/OrderItem";

export default {
  Query: {
    orderItens: async () => await GetAllOrderItens(),
  },
  Mutation: {
    addOrderItem: async (_: any, args: OrderItem) => await AddOrderItem(args),
  },
};
