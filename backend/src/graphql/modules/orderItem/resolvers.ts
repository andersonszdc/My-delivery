import { GetAllOrderItens } from "../../../services/OrderItem";

export default {
  Query: {
    orderItens: async () => await GetAllOrderItens(),
  },
};
