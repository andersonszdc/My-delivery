import { AddOrderItem, GetAllOrderItens } from "../../../services/OrderItem";

export default {
  Query: {
    orderItens: async () => await GetAllOrderItens(),
  },
  Mutation: {
    addOrderItem: async (parent, info) => await AddOrderItem(info),
  },
};
