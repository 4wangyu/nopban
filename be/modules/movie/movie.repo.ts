import database from '../../database';
import { Movie } from '../../models/movie.model';

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

async function selectMovieRating(uuid: string, email: string): Promise<number> {
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

export { insertMovie, selectMovieByUuid, selectMovieRating };
