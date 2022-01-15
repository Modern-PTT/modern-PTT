import express from "express";
import { ApolloServer, PubSub } from "apollo-server-express";
import { importSchema } from "graphql-import";
import bodyParser from "body-parser";
import cors from "cors";
import http from "http";
import "dotenv-defaults/config.js";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";

import * as db from "./backend/src/models";
import Query from "./backend/src/resolvers/Query.js";
import Mutation from './resolvers/Mutation';
import timeScalar from './backend/src/resolvers/Time';
import Board from './backend/src/resolvers/Board';
import Article from './backend/src/resolvers/Article';
import Comment from './backend/src/resolvers/Comment';
import User from "./backend/src/resolvers/User";
import mongo from "./backend/src/mongo.js";

import wakeUpDyno from "./backend/src/utilities/wakeUpDyno";

const __dirname = dirname(fileURLToPath(import.meta.url));
const port = process.env.PORT || 80;

const typeDefs = importSchema("./backend/src/schema.graphql");
const pubsub = new PubSub();
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "build")));
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Mutation,
    Time: timeScalar,
    Board,
    Article,
    Comment,
    User,
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
  const DYNO_URL = "https://modern-ptt.herokuapp.com/";
  wakeUpDyno(DYNO_URL);
  console.log(`🚀 Server Ready at ${port}! 🚀`);
  console.log(`Graphql Port at ${port}${server.subscriptionsPath}`);
});
