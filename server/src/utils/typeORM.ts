import { createConnection, getConnectionOptions } from 'typeorm';

export const connect = async () => {
  const connOptions = await getConnectionOptions(process.env.NODE_ENV);
  const conn = await createConnection({ ...connOptions, name: 'default' });

  return conn;
};
