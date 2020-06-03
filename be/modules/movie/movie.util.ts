import { MovieSearchItem, Movie } from '../../models/movie.model';
import { arrToStr, getName } from '../../lib/util';

function formatMovieSearchItem(movie: Partial<Movie>): MovieSearchItem {
  const url = movie.uuid;
  const title = movie.title + ' (' + movie.year + ')';

  const metas = [];
  const time = movie.runtime || movie.episodeRuntime;
  metas.push(arrToStr(movie.countries.concat(movie.genres).concat([time])));
  metas.push(
    arrToStr(
      getName(movie.directors)
        .slice(0, 5)
        .concat(getName(movie.actors).slice(0, 5))
    )
  );

  const poster = movie.poster;
  const saved = true;
  return { url, title, metas, poster, saved };
}

export { formatMovieSearchItem };
