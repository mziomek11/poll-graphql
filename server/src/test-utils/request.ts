import { GraphQLClient } from 'graphql-request';

export default async function(gqlString: string, token?: string) {
  const url = `http://localhost:${process.env.SERVER_PORT}/graphql`;
  const options = token
    ? { headers: { authorization: `Bearer ${token}` } }
    : {};

  const client = new GraphQLClient(url, options);

  const res = await client.request(gqlString);
  return res;
}
