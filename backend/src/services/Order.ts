import { getRepository } from "typeorm"
import { Order } from "../entities/Order"

export const GetAllOrders = async () => {
    const repo = getRepository(Order)

    const result = await repo.find()

    return result
}