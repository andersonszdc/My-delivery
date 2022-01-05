export default `
type Payment {
  clientSecret: String
}

type Mutation {
  createPaymentIntent(items: String): String
}
`;
