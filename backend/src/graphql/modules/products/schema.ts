export default `type Product {
  name: String
  description: String
}

type Query {
  products: [Product]
}

type Mutation {
  addProduct(name: String, description: String): Product
  updateProduct(id: String, name: String, description: String): Product
}

type Subscription {
  productAdded: Product
}
`;