const knex = require('knex');
const environment = 'development';
const config = require('../knexfile')[environment];
module.exports = knex(config);

knex(config).migrate.latest([require('../knexfile')]);
