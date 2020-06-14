import { Request, Response } from 'express';
import puppet from '../../puppet';
import { getUuidFromUrl } from '../../lib/util';
import { parseMusicSearch, parseMusic } from './music-parser';
import {
  selectMusicByUuid,
  insertMusic,
  selectMusicRating,
  updateMusicRating,
  insertMusicRating,
  deleteMusicRating,
} from './music.repo';
import { formatBookSearchItem } from './music.util';
import { Music } from '../../models/music.model';

const searchMusic = async (request: Request, response: Response) => {
  const searchKey = encodeURI(request.query.searchKey as string);
  const start = request.query.start || '0';
  const url = `https://search.douban.com/music/subject_search?search_text=${searchKey}&start=${start}`;

  const page = await puppet();

  try {
    await page.goto(url);
    await page.waitForSelector('#wrapper');
    const bodyHTML = await page.evaluate(
      () => document.getElementById('wrapper').innerHTML
    );
    const results = parseMusicSearch(bodyHTML);

    // Return music from db if item exists
    // const items = [];
    // for (let m of results.items) {
    //   const uuid = getUuidFromUrl(m.url);
    //   const book = await selectMusicByUuid(uuid);

    //   if (book) {
    //     items.push(formatBookSearchItem(book));
    //   } else {
    //     items.push(m);
    //   }
    // }
    // results.items = items;

    response.status(200).json(results);
  } catch (e) {
    console.warn(e);
    response.status(500).json({ error: 'Error fetching search results' });
  } finally {
    await page.close();
  }
};

const addMusic = async (request: Request, response: Response) => {
  const url = request.body.url as string;
  const uuid = getUuidFromUrl(url);

  const music = await selectMusicByUuid(uuid);
  if (music) {
    response.status(400).json({ error: 'Book exists' });
    return;
  }

  const page = await puppet();

  try {
    await page.goto(url);
    await page.waitForSelector('#wrapper');
    const bodyHTML = await page.evaluate(
      () => document.getElementById('wrapper').innerHTML
    );
    const parsedBook = await parseMusic(bodyHTML);

    const partBook = await insertMusic({ uuid, ...parsedBook } as Music);
    const result = formatBookSearchItem(partBook);

    response.status(200).json(result);
  } catch (e) {
    console.warn(e);
    response.status(500).json({ error: 'Error adding book' });
  } finally {
    await page.close();
  }
};

async function getMusic(req: Request, res: Response) {
  const bookId = req.params.bookId;
  try {
    const book = await selectMusicByUuid(bookId);
    if (book) {
      delete book.id;
      delete book.created_at;
      res.status(200).json(book);
    } else {
      res.status(400).json({
        error: 'Book does not exist',
      });
    }
  } catch (e) {
    console.warn(e);
    res.status(500).json({ error: 'Error finding book' });
  }
}

async function getMusicRating(req: Request, res: Response) {
  const uuid = req.query.uuid as string;
  const email = req.body.email as string;

  try {
    const rating = (await selectMusicRating(uuid, email)) || {
      rating: null,
    };
    res.status(200).json(rating);
  } catch (e) {
    console.warn(e);
    res.status(500).json({ error: 'Error fetching book rating' });
  }
}

async function rateMusic(req: Request, res: Response) {
  const prevRating = req.body.prevRating as number;
  const nextRating = req.body.nextRating as number;
  const uuid = req.body.uuid as string;
  const email = req.body.email as string;

  try {
    if (prevRating) {
      const rating = await updateMusicRating(uuid, email, nextRating);
      res.status(200).json(rating);
    } else {
      const rating = await insertMusicRating(uuid, email, nextRating);
      res.status(200).json(rating);
    }
  } catch (e) {
    console.warn(e);
    res.status(500).json({ error: 'Error rating book' });
  }
}

async function removeMusicRating(req: Request, res: Response) {
  const uuid = req.body.uuid as string;
  const email = req.body.email as string;

  try {
    const result = await deleteMusicRating(uuid, email);
    res.status(200).json({ success: result });
  } catch (e) {
    console.warn(e);
    res.status(500).json({ error: 'Error removing book rating' });
  }
}

export {
  searchMusic,
  addMusic,
  getMusic,
  getMusicRating,
  rateMusic,
  removeMusicRating,
};
