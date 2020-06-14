import { arrToStr, getName } from '../../lib/util';
import { BookSearchItem, Book } from '../../models/book.model';

function formatBookSearchItem(movie: Partial<Book>): BookSearchItem {
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
  const saved = true;
  return { url, title, metas, poster, saved };
}

export { formatBookSearchItem };
