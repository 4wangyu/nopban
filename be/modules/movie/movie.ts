import axios from 'axios';
import { Request, Response } from 'express';
import { getUuidFromUrl } from '../../lib/util';
import { Movie } from '../../models/movie.model';
import puppet from '../../puppet';
import { parseMovie, parseMovieSearch } from './movie-parser';
import {
  deleteMovieRating,
  insertMovie,
  insertMovieRating,
  selectMovieByTitle,
  selectMovieByUuid,
  selectMovieRating,
  updateMovieRating,
} from './movie.repo';
import { formatInternalMovieSearchItem } from './movie.util';

const searchMovie = async (request: Request, response: Response) => {
  const start = +request.query.start || 0;
  const searchKey = request.query.searchKey as string;
  const internal = JSON.parse(request.query.internal as string) as boolean;

  if (internal) {
    const selectedItems = await selectMovieByTitle(searchKey, start);
    const items = selectedItems.map((m) => formatInternalMovieSearchItem(m));
    response.status(200).json({ items, pagination: [] });
  } else {
    const encodedSearchKey = encodeURI(searchKey);
    const url = `https://search.douban.com/movie/subject_search?search_text=${encodedSearchKey}&start=${start}`;

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
          items.push(formatInternalMovieSearchItem(movie));
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
  }
};

const addMovie = async (request: Request, response: Response) => {
  const url = request.body.url as string;
  const uuid = getUuidFromUrl(url);

  const movie = await selectMovieByUuid(uuid);
  if (movie) {
    response.status(400).json({ error: 'Movie exists' });
    return;
  }

  try {
    const res = await axios.get(url);
    const movie = await parseMovie(res.data);
    const partMovie = await insertMovie({ uuid, ...movie } as Movie);
    const result = formatInternalMovieSearchItem(partMovie);
    response.status(200).json(result);
  } catch (e) {
    console.warn(e);
    response.status(500).json({ error: 'Error adding movie' });
  }
};

async function getMovie(req: Request, res: Response) {
  const movieId = req.params.movieId;
  try {
    const movie = await selectMovieByUuid(movieId);
    if (movie) {
      delete movie.id;
      delete movie.createdat;
      res.status(200).json(movie);
    } else {
      res.status(400).json({
        error: 'Movie does not exist',
      });
    }
  } catch (e) {
    console.warn(e);
    res.status(500).json({ error: 'Error finding movie' });
  }
}

async function getMovieRating(req: Request, res: Response) {
  const movieUuid = req.query.movieUuid as string;
  const email = req.body.email as string;

  try {
    const rating = (await selectMovieRating(movieUuid, email)) || {
      rating: null,
    };
    res.status(200).json(rating);
  } catch (e) {
    console.warn(e);
    res.status(500).json({ error: 'Error fetching movie rating' });
  }
}

async function rateMovie(req: Request, res: Response) {
  const prevRating = req.body.prevRating as number;
  const nextRating = req.body.nextRating as number;
  const movieUuid = req.body.movieUuid as string;
  const email = req.body.email as string;

  try {
    if (prevRating) {
      const rating = await updateMovieRating(movieUuid, email, nextRating);
      res.status(200).json(rating);
    } else {
      const rating = await insertMovieRating(movieUuid, email, nextRating);
      res.status(200).json(rating);
    }
  } catch (e) {
    console.warn(e);
    res.status(500).json({ error: 'Error rating movie' });
  }
}

async function removeMovieRating(req: Request, res: Response) {
  const movieUuid = req.body.movieUuid as string;
  const email = req.body.email as string;

  try {
    const result = await deleteMovieRating(movieUuid, email);
    res.status(200).json({ success: result });
  } catch (e) {
    console.warn(e);
    res.status(500).json({ error: 'Error removing movie rating' });
  }
}

export {
  searchMovie,
  addMovie,
  getMovie,
  getMovieRating,
  rateMovie,
  removeMovieRating,
};
