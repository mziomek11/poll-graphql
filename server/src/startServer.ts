import * as express from 'express';
import { config as envConfig } from 'dotenv';

import { connect } from './utils/typeORM';
import { createApolloServer } from './utils/apollo';

export const startServer = async () => {
  envConfig();
  const connection = await connect();

  const app = express();
  const apolloServer = await createApolloServer();
  apolloServer.applyMiddleware({ app });

  const server = app.listen(process.env.PORT);

  return { app, server, apolloServer, connection };
};
