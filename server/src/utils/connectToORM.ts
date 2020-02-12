import { createConnection, getConnectionOptions } from 'typeorm';

export default async () => {
  const connOptions = await getConnectionOptions(process.env.NODE_ENV);
  const conn = await createConnection({ ...connOptions, name: 'default' });

  return conn;
};
