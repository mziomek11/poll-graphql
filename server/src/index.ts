import * as express from 'express';

import connectToORM from './utils/connectToORM';
import createApolloServer from './utils/createApolloServer';

const port = 4000;

(async () => {
  await connectToORM();

  const app = express();
  const apolloServer = await createApolloServer();
  apolloServer.applyMiddleware({ app });

  app.listen(port, () => console.log(`Server running on localhost:${port}`));
})();
