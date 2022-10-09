exports.up = function (knex) {
  const createQuery = `CREATE TABLE movie(
    id SERIAL PRIMARY KEY NOT NULL,
    uuid VARCHAR(10),
    title VARCHAR(100),
    year SMALLINT,
    poster TEXT,
    directors JSON,
    playwriters JSON,
    actors JSON,
    genres VARCHAR(10)[],
    website VARCHAR(100),
    countries VARCHAR(40)[],
    languages VARCHAR(40)[],
    releaseDates VARCHAR(40)[],
    episodes SMALLINT,
    episodeRuntime VARCHAR(60),
    runtime VARCHAR(50),
    aliases VARCHAR(100)[],
    imdb VARCHAR(100),
    createdat TIMESTAMP
  )`;
  return knex.raw(createQuery);
};

exports.down = function (knex) {
  const dropQuery = 'DROP TABLE movie';
  return knex.raw(dropQuery);
};
