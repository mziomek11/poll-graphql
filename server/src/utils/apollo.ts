import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';

import { IContext } from '../types/Context';

import AuthResolver from '../resolvers/AuthResolver';
import PollResolver from '../resolvers/PollResolver';

import userLoader from '../loaders/user';

export const createApolloServer = async () => {
  const schema = await buildSchema({
    resolvers: [AuthResolver, PollResolver]
  });

  const debug = process.env.NODE_ENV !== 'production';

  return new ApolloServer({
    schema,
    debug,
    context: ({ req, res }): IContext => ({ req, res, userLoader })
  });
};
