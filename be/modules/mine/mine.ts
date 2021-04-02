import { Request, Response } from 'express';
import { formatBookSearchItem } from '../book/book.util';
import { formatMovieSearchItem } from '../movie/movie.util';
import { formatMusicSearchItem } from '../music/music.util';
import { selectLatestFive, selectPagination, selectTotal } from './mine.repo';

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

async function getPagination(req: Request, res: Response) {
  const category = req.query.category as string;
  const email = req.body.email as string;

  try {
    const selectedItems = await selectPagination(category, email);
    let items;
    switch (category) {
      case 'book':
        items = selectedItems.map((m) => formatBookSearchItem(m));
        break;
      case 'movie': 
        items = selectedItems.map((m) => formatMovieSearchItem(m));
        break;
      case 'music':
        items = selectedItems.map((m) => formatMusicSearchItem(m));
    }
    res.status(200).json({items, pagination: []});
  } catch (e) {
    console.warn(e);
    res.status(500).json({ error: 'Error fetching latest five items' });
  }
}

export { getTotal, getLatestFive, getPagination };
