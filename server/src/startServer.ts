import * as express from 'express';

import connectToORM from './utils/connectToORM';
import createApolloServer from './utils/createApolloServer';

export const port = 4000;

export const startServer = async () => {
  const connection = await connectToORM();

  const app = express();
  const apolloServer = await createApolloServer();
  apolloServer.applyMiddleware({ app });

  const server = app.listen(port);

  return { app, server, apolloServer, connection };
};
