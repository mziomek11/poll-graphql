import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';

import AuthResolver from '../resolvers/AuthResolver';
import PollResolver from '../resolvers/PollResolver';

export const createApolloServer = async () => {
  const schema = await buildSchema({
    resolvers: [AuthResolver, PollResolver]
  });

  return new ApolloServer({
    schema,
    debug: false,
    context: ({ req, res }) => ({ req, res })
  });
};
