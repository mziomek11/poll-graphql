import { request } from 'graphql-request';

export default async (gqlString: string) => {
  const url = `${process.env.TEST_HOST}/graphql`;
  const res = await request(url, gqlString);

  return res;
};
