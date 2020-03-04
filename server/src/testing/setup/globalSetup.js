const { startServer } = require('../../startServer');
const { createUser } = require('../database/createUser');

module.exports = function() {
  startServer().then(result => {
    global.connection = result.connection;
    global.server = result.server;
    createUser();
  });
};
