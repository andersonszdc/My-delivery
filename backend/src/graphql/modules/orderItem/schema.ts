export default `
type OrderItem {
  id: String
  quantity: Int
}

type Query {
    orderItens: [OrderItem]
}

type Mutation {
    addOrderItem(quantity: Int, order: String, product: String): OrderItem
}
`;
