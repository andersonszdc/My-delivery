import { getRepository } from "typeorm"
import { OrderItem } from "../entities/OrderItem"

export const GetAllOrderItens = async () => {
    const repo = getRepository(OrderItem)

    const result = await repo.find()

    return result
}