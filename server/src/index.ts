import * as express from 'express';
import { createConnection, getConnectionOptions } from 'typeorm';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';

import { UserResolver } from './resolvers';

const port = 4000;

(async () => {
  const app = express();

  const connOptions = await getConnectionOptions('development');
  await createConnection({ ...connOptions, name: 'default' });

  const apollowServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver]
    }),
    context: ({ req, res }) => ({ req, res })
  });

  apollowServer.applyMiddleware({ app });
  app.listen(port, () => console.log(`Listening on port ${port}`));
})();
