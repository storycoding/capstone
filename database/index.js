const knex = require('knex') ({
    client: 'pg',

    connection: {
      host: '127.0.0.1', 
      user: 'macbookair', 
      password: '', 
      database: 'carn', 
    }
  });

module.exports = {
  pg: knex
}