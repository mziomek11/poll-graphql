import 'reflect-metadata';
import * as express from 'express';
import * as cors from 'cors';

import { connectMongoose } from './utils/database';
import { setupEnvVariables } from './utils/env';
import { createApolloServer } from './utils/apollo';

export async function startServer() {
  setupEnvVariables();

  const app = express();
  app.use(cors());
  const connection = await connectMongoose();
  const apolloServer = await createApolloServer();
  apolloServer.applyMiddleware({ app });

  const server = app.listen(process.env.PORT);

  if (process.env.NODE_ENV === 'development') {
    console.log(`Server listening on port ${process.env.PORT}`);
  }

  return { app, server, apolloServer, connection };
}
