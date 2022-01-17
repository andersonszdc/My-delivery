export default `
type Order {
  id: String
}

type Query {
    orders: [Order]
}

type Mutation {
    addOrder: Order
}
`;
