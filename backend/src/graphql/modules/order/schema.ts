export default `
type Order {
  id: String
}

type Query {
    getAllOrders: [Order]
}
`;
