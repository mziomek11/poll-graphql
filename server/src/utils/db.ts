import * as mongoose from 'mongoose';

export const connectMongoose = async () => {
  const url = getMongoUrl();
  const connection = await mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  return connection;
};

const getMongoUrl = () => {
  const { NODE_ENV } = process.env;

  if (NODE_ENV === 'development') return getDevelopmentMongoUrl();
  if (NODE_ENV === 'test') return getTestMongoUrl();
  return getProductionMongoUrl();
};

const getDevelopmentMongoUrl = () => {
  const { DB_NAME_DEVELOPMENT } = process.env;
  if (!DB_NAME_DEVELOPMENT) {
    throw new Error('Please add DB_NAME_DEVELOPMENT to environment variables');
  }

  return `mongodb://127.0.0.1/${DB_NAME_DEVELOPMENT}`;
};

const getTestMongoUrl = () => {
  const { DB_NAME_TEST } = process.env;

  if (!DB_NAME_TEST) {
    throw new Error('Please add DB_NAME_TEST to environment variables');
  }

  return `mongodb://127.0.0.1/${DB_NAME_TEST}`;
};

const getProductionMongoUrl = () => {
  const { DB_USERNAME, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;

  if (!DB_USERNAME) {
    throw new Error('Please add DB_USERNAME to environment variables');
  }

  if (!DB_PASSWORD) {
    throw new Error('Please add DB_PASSWORD to environment variables');
  }

  if (!DB_HOST) {
    throw new Error('Please add DB_HOST to environment variables');
  }

  if (!DB_PORT) {
    throw new Error('Please add DB_PORT to environment variables');
  }

  if (!DB_NAME) {
    throw new Error('Please add DB_NAME to environment variables');
  }

  return `mongodb://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;
};
