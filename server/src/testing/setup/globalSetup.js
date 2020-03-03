const { startServer } = require('../../startServer');

module.exports = function() {
  startServer().then(result => {
    global.connection = result.connection;
    global.server = result.server;
  });
};
