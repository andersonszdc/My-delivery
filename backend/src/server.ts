import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import typeDefs from "./graphql/typeDefs";
import resolvers from "./graphql/resolvers";
import "./database";

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
