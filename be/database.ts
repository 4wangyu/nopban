import knex from 'knex';
const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];

export default knex(configuration);
