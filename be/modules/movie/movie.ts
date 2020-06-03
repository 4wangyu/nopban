import { Request, Response } from 'express';
import puppet from '../../puppet';

import { parseMovieSearch, parseMovie } from './movie-parser';
import { insertMovie } from './movie.repo';
import { Movie } from '../../models/movie.model';
import { formatMovieSearchItem } from './movie.util';

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
    const resuls = parseMovieSearch(bodyHTML);

    response.status(200).json(resuls);
  } catch (e) {
    console.warn(e);
    response.status(500).json({ error: 'Error in fetching search results' });
  } finally {
    await page.close();
  }
};

const addMovie = async (request: Request, response: Response) => {
  const url = request.body.url as string;
  console.log(url);
  const uuid = url.split('/').reverse()[1];

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
