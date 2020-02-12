module.exports = async function() {
  await global.connection.close();
  global.server.close();
};
