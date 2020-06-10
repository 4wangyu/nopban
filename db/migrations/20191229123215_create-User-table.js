exports.up = function (knex) {
  const createQuery = `CREATE TABLE Users(
    Id SERIAL PRIMARY KEY NOT NULL,
    Username TEXT,
    Email TEXT,
    Token TEXT,
    PwdDigest TEXT,
    CreatedAt TIMESTAMP
  )`;
  return knex.raw(createQuery);
};

exports.down = function (knex) {
  const dropQuery = 'DROP TABLE Users';
  return knex.raw(dropQuery);
};
