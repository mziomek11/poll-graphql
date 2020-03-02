module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  globalSetup: './src/test-utils/globalSetup.js',
  globalTeardown: './src/test-utils/globalTeardown.js'
};
