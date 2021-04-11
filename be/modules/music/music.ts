import axios from 'axios';
import { Request, Response } from 'express';
import { getUuidFromUrl } from '../../lib/util';
import { Music } from '../../models/music.model';
import puppet from '../../puppet';
import { parseMusic, parseMusicSearch } from './music-parser';
import {
  deleteMusicRating,
  insertMusic,
  insertMusicRating,
  selectMusicByTitle,
  selectMusicByUuid,
  selectMusicRating,
  updateMusicRating,
} from './music.repo';
import { formatInternalMusicSearchItem } from './music.util';

const searchMusic = async (request: Request, response: Response) => {
  const start = +request.query.start || 0;
  const searchKey = request.query.searchKey as string;
  const internal = JSON.parse(request.query.internal as string) as boolean;

  if (internal) {
    const selectedItems = await selectMusicByTitle(searchKey, start);
    const items = selectedItems.map((m) => formatInternalMusicSearchItem(m));
    response.status(200).json({ items, pagination: [] });
  } else {
    const encodedSearchKey = encodeURI(searchKey);
    const url = `https://search.douban.com/music/subject_search?search_text=${encodedSearchKey}&start=${start}`;

    const page = await puppet();

    try {
      await page.goto(url);
      await page.waitForSelector('#wrapper');
      const bodyHTML = await page.evaluate(
        () => document.getElementById('wrapper').innerHTML
      );
      const results = parseMusicSearch(bodyHTML);

      // Return music from db if item exists
      const items = [];
      for (let m of results.items) {
        const uuid = getUuidFromUrl(m.url);
        const music = await selectMusicByUuid(uuid);

        if (music) {
          items.push(formatInternalMusicSearchItem(music));
        } else {
          items.push(m);
        }
      }
      results.items = items;

      response.status(200).json(results);
    } catch (e) {
      console.warn(e);
      response.status(500).json({ error: 'Error fetching search results' });
    } finally {
      await page.close();
    }
  }
};

const addMusic = async (request: Request, response: Response) => {
  const url = request.body.url as string;
  const uuid = getUuidFromUrl(url);

  const music = await selectMusicByUuid(uuid);
  if (music) {
    response.status(400).json({ error: 'Music exists' });
    return;
  }

  try {
    const res = await axios.get(url);
    const parsedMusic = await parseMusic(res.data);
    const partMusic = await insertMusic({ uuid, ...parsedMusic } as Music);
    const result = formatInternalMusicSearchItem(partMusic);
    response.status(200).json(result);
  } catch (e) {
    console.warn(e);
    response.status(500).json({ error: 'Error adding music' });
  }
};

async function getMusic(req: Request, res: Response) {
  const uuid = req.params.uuid;
  try {
    const music = await selectMusicByUuid(uuid);
    if (music) {
      delete music.id;
      delete music.created_at;
      res.status(200).json(music);
    } else {
      res.status(400).json({
        error: 'Music does not exist',
      });
    }
  } catch (e) {
    console.warn(e);
    res.status(500).json({ error: 'Error finding music' });
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
    res.status(500).json({ error: 'Error fetching music rating' });
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
    res.status(500).json({ error: 'Error rating music' });
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
    res.status(500).json({ error: 'Error removing music rating' });
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
