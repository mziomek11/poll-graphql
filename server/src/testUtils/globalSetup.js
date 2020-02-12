const { startServer } = require('../startServer');

module.exports = async function() {
  const { connection, server } = await startServer();

  global.connection = connection;
  global.server = server;
};
