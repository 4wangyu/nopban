exports.up = function (knex) {
  const createQuery = `CREATE TABLE Movie(
    Id SERIAL PRIMARY KEY NOT NULL,
    UUID VARCHAR(8),
    Title VARCHAR(100),
    Year SMALLINT,
    Poster TEXT,
    Directors JSON,
    playwriters JSON,
    actors JSON,
    genres VARCHAR(10)[],
    website VARCHAR(100),
    countries VARCHAR(20)[],
    languages VARCHAR(20)[],
    releaseDates VARCHAR(20)[],
    episodes SMALLINT,
    episodeRuntime VARCHAR(20),
    runtime VARCHAR(20),
    aliases VARCHAR(100)[],
    imdb VARCHAR(100),
    CreatedAt TIMESTAMP
  )`;
  return knex.raw(createQuery);
};

exports.down = function (knex) {
  const dropQuery = 'DROP TABLE Movie';
  return knex.raw(dropQuery);
};
