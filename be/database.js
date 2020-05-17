const environment = process.env.NODE_ENV || "development";
const configuration = require("../knexfile")[environment];

console.log(configuration.connection);

module.exports = require("knex")(configuration);
