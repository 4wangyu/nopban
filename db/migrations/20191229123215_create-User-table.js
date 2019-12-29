exports.up = function(knex, Promise) {
  let createQuery = `CREATE TABLE Users(
    Id SERIAL PRIMARY KEY NOT NULL,
    Username TEXT,
    Token TEXT,
    PwdDigest TEXT,
    CreatedAt TIMESTAMP
  )`;
  return knex.raw(createQuery);
};

exports.down = function(knex, Promise) {
  let dropQuery = `DROP TABLE Users`;
  return knex.raw(dropQuery);
};
