import cheerio from 'cheerio';
import { getBase64 } from '../../lib/util';
import {
  Movie,
  MovieSearchItemType,
  MovieSearchPagination,
  NameLinkModel,
} from '../../models/movie.model';

function parseMovieSearch(html: string): {
  items: MovieSearchItemType[];
  pagination: MovieSearchPagination[];
} {
  const $ = cheerio.load(html, { normalizeWhitespace: true });

  // parse movie items
  const items: MovieSearchItemType[] = [];
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
        saved: false,
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

async function parseMovie(html: string): Promise<Partial<Movie>> {
  const $ = cheerio.load(cheerio.load(html)('#wrapper').html());

  const title = $('h1 span:first-child').text();
  const year = +$('h1 .year').text().substring(1, 5);

  const posterSrc = $('.subject img').attr('src');
  const poster = await getBase64(posterSrc);

  const directors: NameLinkModel[] = [];
  $('a[rel="v:directedBy"]').each((idx, el) => {
    const name = $(el).text();
    const link = $(el).attr('href');
    directors.push({ name, link });
  });

  const playwriters: NameLinkModel[] = [];
  $('span:contains("编剧")')
    .find('a')
    .each((idx, el) => {
      const name = $(el).text();
      const link = $(el).attr('href');
      playwriters.push({ name, link });
    });

  const actors: NameLinkModel[] = [];
  $('a[rel="v:starring"]').each((idx, el) => {
    const name = $(el).text();
    const link = $(el).attr('href');
    actors.push({ name, link });
  });

  const genres: string[] = [];
  $('span[property="v:genre"]').each((idx, el) => {
    const genre = $(el).text();
    genres.push(genre);
  });

  const website = $('span:contains("官方网站")').next().attr('href') ?? null;

  const countries: string[] = [];
  $('span:contains("制片国家")')
    .get(0)
    ?.nextSibling.data.split('/')
    .forEach((c: string) => countries.push(c.trim()));

  const languages: string[] = [];
  $('span:contains("语言")')
    .get(0)
    ?.nextSibling.data.split('/')
    .forEach((l: string) => languages.push(l.trim()));

  const releaseDates: string[] = [];
  $('span[property="v:initialReleaseDate"]').each((i, e) => {
    releaseDates.push($(e).attr('content'));
  });

  const episodesEl = $('span:contains("集数")').get(0);
  const episodes = episodesEl ? +episodesEl.nextSibling.data.trim() : null;

  const episodeRuntimeEl = $('span:contains("单集片长")').get(0);
  const episodeRuntime = episodeRuntimeEl
    ? episodeRuntimeEl.nextSibling.data.trim()
    : null;

  const runtime = $('span[property="v:runtime"]').text() ?? null;

  const aliasesEl = $('span:contains("又名")').get(0);
  const aliases = aliasesEl
    ? aliasesEl.nextSibling.data.split('/').map((a: string) => a.trim())
    : [];

  let imdbEl = $('span:contains("IMDb")').get(0);
  const imdb = imdbEl
    ? 'https://www.imdb.com/title/' + imdbEl.nextSibling.data.trim()
    : null;

  return {
    title,
    year,
    poster,
    directors,
    playwriters,
    actors,
    genres,
    website,
    countries,
    languages,
    releaseDates,
    episodes,
    episodeRuntime,
    runtime,
    aliases,
    imdb,
  };
}

export { parseMovieSearch, parseMovie };
