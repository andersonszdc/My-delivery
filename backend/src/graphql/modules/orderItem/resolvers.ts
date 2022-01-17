import { GetAllOrderItens } from "../../../services/OrderItem"

export default {
    Query: {
        getAllOrderItens: async () => {
            return await GetAllOrderItens()
        }
    }
}