import { GetAllOrders } from "../../../services/Order"

export default {
    Query: {
        getAllOrders: async () => {
            return await GetAllOrders()
        }
    }
}