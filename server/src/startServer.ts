import 'reflect-metadata';
import * as express from 'express';

import { connectMongoose } from './utils/database';
import { setupEnvVariables } from './utils/env';
import { createApolloServer } from './utils/apollo';

export async function startServer() {
  setupEnvVariables();

  const app = express();
  const connection = await connectMongoose();
  const apolloServer = await createApolloServer();
  apolloServer.applyMiddleware({ app });

  const server = app.listen(process.env.SERVER_PORT);

  if (process.env.NODE_ENV === 'development') {
    console.log(`Server listening on port ${process.env.SERVER_PORT}`);
  }

  return { app, server, apolloServer, connection };
}
