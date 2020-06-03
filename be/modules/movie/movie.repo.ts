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

export { insertMovie };
