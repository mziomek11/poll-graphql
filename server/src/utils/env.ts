import { config } from 'dotenv';

export const setupEnvVariables = () => {
  config();
  const expectedVariables = ['PORT', 'AUTH_SECRET_KEY'];

  expectedVariables.forEach(variable => {
    if (!process.env[variable]) {
      throw new Error(`Please add ${variable} to environment variables`);
    }
  });
};
