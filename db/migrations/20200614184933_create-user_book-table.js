exports.up = function (knex) {
  const createQuery = `CREATE TABLE user_book(
    id SERIAL PRIMARY KEY NOT NULL,
    user_id INT,
    book_id INT,
    rating SMALLINT,
    updatedat TIMESTAMP,
    createdat TIMESTAMP
  )`;
  return knex.raw(createQuery);
};

exports.down = function (knex) {
  const dropQuery = 'DROP TABLE user_book';
  return knex.raw(dropQuery);
};
