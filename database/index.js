const knex = require('knex') ({
    client: 'pg',

    connection: {
      host: '127.0.0.1', 
      user: 'macbookair', 
      password: '', 
      database: 'capstone', 
    }
  });

module.exports = {
  knex: knex
}