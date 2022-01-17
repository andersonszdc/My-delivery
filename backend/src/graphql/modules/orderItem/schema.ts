export default `
type OrderItem {
  id: String
  quantity: Int
}

type Query {
    getAllOrderItens: [OrderItem]
}
`;
