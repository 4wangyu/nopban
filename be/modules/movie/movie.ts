import { Request, Response } from 'express';
import puppet from '../../puppet';

import { parseMovieSearch, parseMovie } from './movie-parser';
import { insertMovie, selectMovieByUuid } from './movie.repo';
import { Movie } from '../../models/movie.model';
import { formatMovieSearchItem } from './movie.util';
import { getUuidFromUrl } from '../../lib/util';

const searchMovie = async (request: Request, response: Response) => {
  const searchKey = encodeURI(request.query.searchKey as string);
  const start = request.query.start || '0';
  const url = `https://search.douban.com/movie/subject_search?search_text=${searchKey}&start=${start}`;

  const page = await puppet();

  try {
    await page.goto(url);
    await page.waitForSelector('#wrapper');
    const bodyHTML = await page.evaluate(
      () => document.getElementById('wrapper').innerHTML
    );
    const results = parseMovieSearch(bodyHTML);

    // Return movie from db if item exists
    const items = [];
    for (let m of results.items) {
      const uuid = getUuidFromUrl(m.url);
      const movie = await selectMovieByUuid(uuid);

      if (movie) {
        items.push(formatMovieSearchItem(movie));
      } else {
        items.push(m);
      }
    }
    results.items = items;

    response.status(200).json(results);
  } catch (e) {
    console.warn(e);
    response.status(500).json({ error: 'Error in fetching search results' });
  } finally {
    await page.close();
  }
};

const addMovie = async (request: Request, response: Response) => {
  const url = request.body.url as string;
  const uuid = getUuidFromUrl(url);

  const movie = await selectMovieByUuid(uuid);
  if (movie) {
    response.status(400).json({ error: 'Movie exists' });
  }

  const page = await puppet();

  try {
    await page.goto(url);
    await page.waitForSelector('#wrapper');
    const bodyHTML = await page.evaluate(
      () => document.getElementById('wrapper').innerHTML
    );
    const movie = await parseMovie(bodyHTML);

    const partMovie = await insertMovie({ uuid, ...movie } as Movie);
    const result = formatMovieSearchItem(partMovie);

    response.status(200).json(result);
  } catch (e) {
    console.warn(e);
    response.status(500).json({ error: 'Error adding movie' });
  } finally {
    await page.close();
  }
};

export { searchMovie, addMovie };
