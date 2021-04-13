import { Request, Response } from 'express';
import { formatMyBookItem } from '../book/book.util';
import { formatMyMovieItem } from '../movie/movie.util';
import { formatMyMusicItem } from '../music/music.util';
import { selectLatestFive, selectSubList, selectTotal } from './mine.repo';

async function getTotal(req: Request, res: Response) {
  const category = req.query.category as string;
  const email = req.body.email as string;

  try {
    const total = await selectTotal(category, email);
    res.status(200).json(total);
  } catch (e) {
    console.warn(e);
    res.status(500).json({ error: 'Error fetching total' });
  }
}

async function getLatestFive(req: Request, res: Response) {
  const category = req.query.category as string;
  const email = req.body.email as string;

  try {
    const latestFive = await selectLatestFive(category, email);
    res.status(200).json(latestFive);
  } catch (e) {
    console.warn(e);
    res.status(500).json({ error: 'Error fetching latest five items' });
  }
}

async function getSubList(req: Request, res: Response) {
  const category = req.query.category as string;
  const count = req.query.count as string;
  const offset = req.query.offset as string;
  const sort = req.query.sort as string;
  const email = req.body.email as string;

  try {
    const selectedItems = await selectSubList(category, count, offset, sort, email);
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
    const total = await selectTotal(category, email);
    res.status(200).json({ items, total });
  } catch (e) {
    console.warn(e);
    res.status(500).json({ error: 'Error fetching list of items' });
  }
}

export { getTotal, getLatestFive, getSubList };
