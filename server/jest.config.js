module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  globalSetup: './src/testing/setup/globalSetup.js',
  globalTeardown: './src/testing/setup/globalTeardown.js'
};
