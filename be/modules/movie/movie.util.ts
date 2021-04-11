import { arrToStr, getName } from '../../lib/util';
import {
  Movie,
  MovieItemType,
  MovieSearchItemType,
  MyMovie,
  MyMovieItemType,
} from '../../models/movie.model';

function formatMovieItem(movie: Partial<Movie>): MovieItemType {
  const url = movie.uuid;
  const title = movie.title + ' (' + movie.year + ')';

  const metas = [];
  const time = movie.runtime || movie.episodeRuntime;
  metas.push(arrToStr(movie.countries.concat(movie.genres).concat([time])));
  metas.push(
    arrToStr(
      getName(movie.directors)
        .slice(0, 2)
        .concat(getName(movie.actors).slice(0, 8))
    )
  );

  const poster = movie.poster;
  return { url, title, metas, poster };
}

function formatInternalMovieSearchItem(
  movie: Partial<Movie>
): MovieSearchItemType {
  const movieItem = formatMovieItem(movie);
  return { ...movieItem, saved: true };
}

function formatMyMovieItem(movie: Partial<MyMovie>): MyMovieItemType {
  const movieItem = formatMovieItem(movie);
  return { ...movieItem, img: movie.img, rating: movie.rating };
}

export { formatMovieItem, formatInternalMovieSearchItem, formatMyMovieItem };
