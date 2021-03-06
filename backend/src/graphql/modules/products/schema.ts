export default `
type Product {
  id: String
  name: String
  description: String
  price: Float
}

type Query {
  products: [Product]
}

type Mutation {
  addProduct(name: String, description: String, price: Float): Product
  updateProduct(id: String, name: String, description: String, price: Float): Product
}

type Subscription {
  productAdded: Product
}
`;
