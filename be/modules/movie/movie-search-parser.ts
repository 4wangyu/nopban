import cheerio from 'cheerio';
import {
  MovieSearchItem,
  MovieSearchPagination,
} from '../../../fe/src/models/movie.model';

function parseMovieSearch(
  html: string
): { items: MovieSearchItem[]; pagination: MovieSearchPagination[] } {
  const $ = cheerio.load(html, { normalizeWhitespace: true });

  // parse movie items
  const items: MovieSearchItem[] = [];
  $('.item-root').each((i, el) => {
    const url = $(el).find('.title-text').attr('href');

    if (url.includes('subject')) {
      const title = $(el).find('.title-text').text();
      const metas = $(el)
        .find('.meta')
        .map((i, e) => $(e).text())
        .get();

      items.push({
        url,
        title,
        metas,
      });
    }
  });

  // parse movie pagination
  const pagination: MovieSearchPagination[] = [];
  $('.paginator a').each((i, el) => {
    const url = $(el).attr('href');
    const start = url ? +url.split('=').reverse()[0] : null;

    const text = $(el).text();
    pagination.push({ start, text });
  });

  return { items, pagination };
}

export default parseMovieSearch;
