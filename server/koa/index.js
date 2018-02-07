require('newrelic');
const Koa = require('koa');
const router = require('./router.js');

const app = new Koa();
const PORT = 2000;

app.use(router.routes());

const server = app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = server;