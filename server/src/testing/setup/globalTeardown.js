const { clearDatabase } = require('../database/clearDatabase');

module.exports = function() {
  clearDatabase()
    .then(() => global.connection.disconnect())
    .then(() => global.server.close());
};
