exports.up = function (knex) {
  const createQuery = `CREATE TABLE user_movie(
    id SERIAL PRIMARY KEY NOT NULL,
    user_id INT,
    movie_id INT,
    rating SMALLINT,
    updatedat TIMESTAMP,
    createdat TIMESTAMP
  )`;
  return knex.raw(createQuery);
};

exports.down = function (knex) {
  const dropQuery = 'DROP TABLE user_movie';
  return knex.raw(dropQuery);
};
