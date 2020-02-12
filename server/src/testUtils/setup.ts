import * as express from 'express';

import connectToORM from '../utils/connectToORM';
import createApolloServer from '../utils/createApolloServer';

const port = 4000;

export const setup = async () => {
  process.env.TEST_HOST = `http://127.0.0.1:${port}`;
  await connectToORM();

  const app = express();
  const apolloServer = await createApolloServer();
  apolloServer.applyMiddleware({ app });

  app.listen(port);
};
