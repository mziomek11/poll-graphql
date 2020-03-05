import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';

import AuthResolver from '../resolvers/AuthResolver';
import PollResolver from '../resolvers/PollResolver';

export const createApolloServer = async () => {
  const schema = await buildSchema({
    resolvers: [AuthResolver, PollResolver]
  });

  const debug = process.env.NODE_ENV !== 'production';

  return new ApolloServer({
    schema,
    debug,
    context: ({ req, res }) => ({ req, res })
  });
};
