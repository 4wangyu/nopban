import database from '../../database';
import { Movie } from '../../models/movie.model';
import { ITEM_COUNT_PER_PAGE } from '../../config';

async function insertMovie(movie: Movie): Promise<Partial<Movie>> {
  const data = await database.raw(
    `INSERT INTO Movie (uuid, title, year, poster, directors, playwriters, actors, 
        genres, website, countries, languages, releaseDates, 
        episodes, episodeRuntime, runtime, aliases, imdb, createdat) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?) 
      RETURNING uuid, title, year, poster, countries, genres, episodeRuntime, runtime, directors, actors`,
    [
      movie.uuid,
      movie.title,
      movie.year,
      movie.poster,
      JSON.stringify(movie.directors),
      JSON.stringify(movie.playwriters),
      JSON.stringify(movie.actors),
      movie.genres,
      movie.website,
      movie.countries,
      movie.languages,
      movie.releaseDates,
      movie.episodes,
      movie.episodeRuntime,
      movie.runtime,
      movie.aliases,
      movie.imdb,
      new Date(),
    ]
  );

  return data.rows[0];
}

async function selectMovieByUuid(uuid: string): Promise<Movie> {
  const data = await database.raw('SELECT * FROM Movie WHERE uuid = ?', [uuid]);
  return data.rows[0];
}

async function selectMovieByTitle(
  searchKey: string,
  start: number
): Promise<Movie[]> {
  const data = (await database
    .table('movie')
    .whereRaw(`lower(title) like '%${searchKey.toLowerCase()}%'`)
    .limit(ITEM_COUNT_PER_PAGE)
    .offset(start)) as Movie[];
  return data;
}

async function selectMovieRating(
  uuid: string,
  email: string
): Promise<{ rating: number }> {
  const data = await database.raw(
    `SELECT um.rating FROM user_movie um
    INNER JOIN users ON users.id = um.user_id
    INNER JOIN movie ON movie.id = um.movie_id
    WHERE users.email = ?
    AND movie.uuid = ?`,
    [email, uuid]
  );

  return data.rows[0];
}

async function insertMovieRating(
  uuid: string,
  email: string,
  rating: number
): Promise<{ rating: number }> {
  const date = new Date();

  const data = await database.raw(
    `INSERT INTO user_movie( user_id, movie_id, rating, updatedat, createdat)
    SELECT users.id, movie.id, ?, ?, ?
    FROM users, movie
    WHERE users.email = ?
    AND movie.uuid = ?
    RETURNING rating`,
    [rating, date, date, email, uuid]
  );
  return data.rows[0];
}

async function updateMovieRating(
  uuid: string,
  email: string,
  rating: number
): Promise<{ rating: number }> {
  const date = new Date();

  const data = await database.raw(
    `UPDATE user_movie um
    SET rating = ?, updatedat = ?
    WHERE um.user_id = (SELECT id FROM users WHERE users.email = ?)
    AND um.movie_id = (SELECT id FROM movie WHERE movie.uuid = ?)
    RETURNING rating
    `,
    [rating, date, email, uuid]
  );

  return data.rows[0];
}

async function deleteMovieRating(
  uuid: string,
  email: string
): Promise<boolean> {
  await database.raw(
    `DELETE FROM user_movie um
    WHERE um.user_id = (SELECT id FROM users WHERE users.email = ?)
    AND um.movie_id = (SELECT id FROM movie WHERE movie.uuid = ?)
    `,
    [email, uuid]
  );

  return true;
}

export {
  insertMovie,
  selectMovieByUuid,
  selectMovieByTitle,
  selectMovieRating,
  insertMovieRating,
  updateMovieRating,
  deleteMovieRating,
};
