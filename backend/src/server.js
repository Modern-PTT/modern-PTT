import { GraphQLServer, PubSub } from 'graphql-yoga';

// resolvers
import timeScalar from './resolvers/Time';
import Board from './resolvers/Board';
import Article from './resolvers/Article';
import Comment from './resolvers/Comment';
import User from './resolvers/User';
import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';
// import Subscription from './resolvers/Subscription';
// import Post from './resolvers/Post';

import * as db from './models';

const pubsub = new PubSub();

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers: {
    Query,
    Mutation,
    //Subscription,
    Time: timeScalar,
    Board,
    Article,
    Comment,
    User,
    //Post,
  },
  context: {
    db,
    pubsub,
  },
});

export default server;