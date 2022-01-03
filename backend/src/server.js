import { GraphQLServer, PubSub } from 'graphql-yoga';

// resolvers
import timeScalar from './resolvers/Time';
// import Query from './resolvers/Query';
// import Mutation from './resolvers/Mutation';
// import Subscription from './resolvers/Subscription';
// import User from './resolvers/User';
// import Post from './resolvers/Post';
// import Comment from './resolvers/Comment';

import * as models from './models';

const pubsub = new PubSub();

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers: {
    //Query,
    //Mutation,
    //Subscription,
    Time: timeScalar,
    //User,
    //Post,
    //Comment,
  },
  context: {
    models,
    pubsub,
  },
});

export default server;