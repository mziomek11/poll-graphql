import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';

import AuthResolver from '../resolvers/AuthResolver';

export default async () => {
  const schema = await buildSchema({
    resolvers: [AuthResolver]
  });

  return new ApolloServer({
    schema,
    debug: false,
    context: ({ req, res }) => ({ req, res })
  });
};
