import { GraphQLClient } from 'graphql-request';

export default async function(gqlString: string, token?: string) {
  const url = `${process.env.HOST}:${process.env.PORT}/graphql`;
  const options = token
    ? { headers: { authorization: `Bearer ${token}` } }
    : {};

  const client = new GraphQLClient(url, options);

  const res = await client.request(gqlString);
  return res;
}
