module.exports = function() {
  global.connection.close().then(() => {
    global.server.close();
  });
};
