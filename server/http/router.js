const handlerFactory = require('./handler');
const parser = require('url');
const handlers = {};

const clear = function() {
  handlers = {};
}

const register = function(url, method) {
  handlers[url] = handlerFactory.createHandler(method);
}

const route = function(req) {
  url = parser.parse(req.url, true);
  const handler = handlers[url.pathname];
  return handler;
}

module.exports = {
  clear: clear,
  register: register,
  route: route
}