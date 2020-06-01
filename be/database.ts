const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];

export default require('knex')(configuration);
