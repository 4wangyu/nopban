exports.up = function (knex) {
  const createQuery = `CREATE TABLE music(
    id SERIAL PRIMARY KEY NOT NULL,
    uuid VARCHAR(10),
    title VARCHAR(100),
    img TEXT,
    musician JSON,
    genre VARCHAR(10),
    album_type VARCHAR(20),
    medium VARCHAR(20),
    publish_time VARCHAR(40),
    publisher VARCHAR(40),
    cd_count SMALLINT,
    barcode VARCHAR(50),
    created_at TIMESTAMP
  )`;
  return knex.raw(createQuery);
};

exports.down = function (knex) {
  const dropQuery = 'DROP TABLE music';
  return knex.raw(dropQuery);
};
