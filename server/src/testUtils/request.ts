import { request } from 'graphql-request';

import { port } from '../startServer';

export default async (gqlString: string) => {
  const url = `http://127.0.0.1:${port}/graphql`;
  const res = await request(url, gqlString);

  return res;
};
