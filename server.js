
import { ApolloServer, PubSub } from "apollo-server-express";
import { importSchema } from "graphql-import";
import http from "http";
import "dotenv-defaults/config.js";

import * as db from "./backend/src/models";
import Query from "./backend/src/resolvers/Query.js";
import timeScalar from './backend/src/resolvers/Time';
import Board from './backend/src/resolvers/Board';
import Article from './backend/src/resolvers/Article';
import Comment from './backend/src/resolvers/Comment';
// import Mutation from "./backend/resolvers/Mutation.js";
// import Subscription from "./backend/resolvers/Subscription.js";
import mongo from "./backend/mongo.js";

const port = process.env.PORT || 80;

const typeDefs = importSchema("./backend/src/schema.graphql");
const pubsub = new PubSub();

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Mutation,
    Subscription,
  },
  context: {
    db,
    pubsub,
  },
});

server.applyMiddleware({ app });
const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

mongo.connect();

httpServer.listen(port, () => {
  console.log(`🚀 Server Ready at ${port}! 🚀`);
  console.log(`Graphql Port at ${port}${server.subscriptionsPath}`);
});
