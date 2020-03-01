import * as express from 'express';
import { config as envConfig } from 'dotenv';

import { connect } from './utils/typeORM';
import { createApolloServer } from './utils/apollo';

export async function startServer() {
  envConfig();

  const app = express();
  const connection = await connect();
  const apolloServer = await createApolloServer();
  apolloServer.applyMiddleware({ app });

  const server = app.listen(process.env.PORT);

  if (process.env.NODE_ENV === 'development') {
    console.log(`Server listening on ${process.env.HOST}:${process.env.PORT}`);
  }

  return { app, server, apolloServer, connection };
}
