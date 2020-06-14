exports.up = function (knex) {
  const createQuery = `CREATE TABLE book(
    id SERIAL PRIMARY KEY NOT NULL,
    uuid VARCHAR(10),
    title VARCHAR(100),
    img TEXT,
    writers JSON,
    publisher VARCHAR(40),
    subtitle VARCHAR(100),
    origin_title VARCHAR(100),
    translators JSON,
    publish_time VARCHAR(40),
    page_count SMALLINT,
    price VARCHAR(40),
    isbn VARCHAR(50),
    created_at TIMESTAMP
  )`;
  return knex.raw(createQuery);
};

exports.down = function (knex) {
  const dropQuery = 'DROP TABLE book';
  return knex.raw(dropQuery);
};
