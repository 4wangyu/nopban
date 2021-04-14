import { Request, Response } from 'express';
import { formatMyBookItem } from '../book/book.util';
import { formatMyMovieItem } from '../movie/movie.util';
import { formatMyMusicItem } from '../music/music.util';
import { selectMyLatestFive, selectMyList, selectMyTotal } from './mine.repo';

async function getMyTotal(req: Request, res: Response) {
  const category = req.query.category as string;
  const email = req.body.email as string;

  try {
    const total = await selectMyTotal(category, email);
    res.status(200).json(total);
  } catch (e) {
    console.warn(e);
    res.status(500).json({ error: 'Error fetching total' });
  }
}

async function getMyLatestFive(req: Request, res: Response) {
  const category = req.query.category as string;
  const email = req.body.email as string;

  try {
    const latestFive = await selectMyLatestFive(category, email);
    res.status(200).json(latestFive);
  } catch (e) {
    console.warn(e);
    res.status(500).json({ error: 'Error fetching latest five items' });
  }
}

async function getMyList(req: Request, res: Response) {
  const category = req.query.category as string;
  const count = req.query.count as string;
  const offset = req.query.offset as string;
  const sortBy = req.query.sortBy as string;
  const email = req.body.email as string;

  try {
    const selectedItems = await selectMyList(category, count, offset, sortBy, email);
    let items;
    switch (category) {
      case 'book':
        items = selectedItems.map((m) => formatMyBookItem(m));
        break;
      case 'movie':
        items = selectedItems.map((m) => formatMyMovieItem(m));
        break;
      case 'music':
        items = selectedItems.map((m) => formatMyMusicItem(m));
    }
    const total = await selectMyTotal(category, email);
    res.status(200).json({ items, total });
  } catch (e) {
    console.warn(e);
    res.status(500).json({ error: 'Error fetching list of items' });
  }
}

export { getMyTotal, getMyLatestFive, getMyList };
