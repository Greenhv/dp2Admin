var server = require('pushstate-server');
var port = process.env.PORT || 9000;

server.start({
  port: 8888,
  directory: './dist',
});