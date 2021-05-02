import { Request, Response } from 'express';
import { CATEGORIES } from '../../lib/constant';
import { Book } from '../../models/book.model';
import { Movie } from '../../models/movie.model';
import { Music } from '../../models/music.model';
import { parseBook } from '../book/book-parser';
import { insertBook, selectBookByUuid } from '../book/book.repo';
import { formatInternalBookSearchItem } from '../book/book.util';
import { parseMovie } from '../movie/movie-parser';
import { insertMovie, selectMovieByUuid } from '../movie/movie.repo';
import { formatInternalMovieSearchItem } from '../movie/movie.util';
import { parseMusic } from '../music/music-parser';
import { insertMusic, selectMusicByUuid } from '../music/music.repo';
import { formatInternalMusicSearchItem } from '../music/music.util';
import { selectItemByUuid } from './extension.repo';

const checkItemExist = async (request: Request, response: Response) => {
  const category = request.query.category as string;
  const uuid = request.query.uuid as string;

  try {
    const item = await selectItemByUuid(category, uuid);
    if (item) {
      response.status(200).json({ result: true });
    } else {
      response.status(200).json({ result: false });
    }
  } catch (e) {
    console.warn(e);
    response.status(500).json({ error: 'Error searching item in database' });
  }
};

const addItem = async (request: Request, response: Response) => {
  const category = request.body.category as string;
  const uuid = request.body.uuid as string;
  const html = request.body.html as string;

  try {
    let result;
    if (!CATEGORIES.includes(category)) {
      response.status(400).json({ error: 'Category not supported' });
      return;
    } else if (category === 'book') {
      const book = await selectBookByUuid(uuid);
      if (book) {
        response.status(400).json({ error: 'Book exists' });
        return;
      }
      const parsedBook = await parseBook(html);
      const partBook = await insertBook({ uuid, ...parsedBook } as Book);
      result = formatInternalBookSearchItem(partBook);
    } else if (category === 'movie') {
      const movie = await selectMovieByUuid(uuid);
      if (movie) {
        response.status(400).json({ error: 'Movie exists' });
        return;
      }
      const parsedMovie = await parseMovie(html);
      const partMovie = await insertMovie({ uuid, ...parsedMovie } as Movie);
      result = formatInternalMovieSearchItem(partMovie);
    } else if (category === 'music') {
      const music = await selectMusicByUuid(uuid);
      if (music) {
        response.status(400).json({ error: 'Music exists' });
        return;
      }
      const parsedMusic = await parseMusic(html);
      const partMusic = await insertMusic({ uuid, ...parsedMusic } as Music);
      result = formatInternalMusicSearchItem(partMusic);
    }
    response.status(200).json(result);
  } catch (e) {
    console.warn(e);
    response.status(500).json({ error: 'Error adding item to database' });
  }
};

export { checkItemExist, addItem };
