import { request } from 'graphql-request';

export default async (gqlString: string) => {
  const url = `${process.env.HOST}:${process.env.PORT}/graphql`;
  const res = await request(url, gqlString);

  return res;
};
