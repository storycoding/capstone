const createHandler = function (method) {
  return new Handler(method);
}

const Handler = function(method) {
  this.process = function(req, res) {
    params = null;
    return method.apply(this, [req, res, params]);
  }
}

module.exports = {
	createHandler : createHandler
}