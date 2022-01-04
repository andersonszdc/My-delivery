import dotenv from "dotenv";
import "reflect-metadata";
import { SubscriptionServer } from "subscriptions-transport-ws";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { ApolloServer } from "apollo-server-express";
import { execute, subscribe } from "graphql";
import resolvers from "./graphql/resolvers";
import typeDefs from "./graphql/typeDefs";
import express from "express";
import http from "http";
import "./database";

dotenv.config();

(async () => {
  const app = express();
  const httpServer = http.createServer(app);

  const schema = makeExecutableSchema({ typeDefs, resolvers });

  const subscriptionServer = SubscriptionServer.create(
    {
      schema,
      execute,
      subscribe,
    },
    {
      server: httpServer,
      path: "/graphql",
    }
  );

  const server = new ApolloServer({
    schema,
    plugins: [
      {
        async serverWillStart() {
          return {
            async drainServer() {
              subscriptionServer.close();
            },
          };
        },
      },
    ],
  });

  await server.start();
  server.applyMiddleware({ app });

  httpServer.listen(process.env.PORT || 3000, () =>
    console.log(`Server is now running on http://localhost:4000/graphql`)
  );
})();
