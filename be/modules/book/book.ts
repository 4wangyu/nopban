import axios from '../../axios';
import { Request, Response } from 'express';
import { getUuidFromUrl } from '../../lib/util';
import { Book } from '../../models/book.model';
import puppet from '../../puppet';
import { parseBook, parseBookSearch } from './book-parser';
import {
  deleteBookRating,
  insertBook,
  insertBookRating,
  selectBookByTitle,
  selectBookByUuid,
  selectBookRating,
  updateBookRating,
} from './book.repo';
import { formatInternalBookSearchItem } from './book.util';

const searchBook = async (request: Request, response: Response) => {
  const start = +request.query.start || 0;
  const searchKey = request.query.searchKey as string;
  const internal = JSON.parse(request.query.internal as string) as boolean;

  if (internal) {
    const selectedItems = await selectBookByTitle(searchKey, start);
    const items = selectedItems.map((m) => formatInternalBookSearchItem(m));
    response.status(200).json({ items, pagination: [] });
  } else {
    const encodedSearchKey = encodeURI(searchKey);
    const url = `https://search.douban.com/book/subject_search?search_text=${encodedSearchKey}&start=${start}`;

    const page = await puppet();

    try {
      await page.goto(url);
      await page.waitForSelector('#wrapper');
      const bodyHTML = await page.evaluate(
        () => document.getElementById('wrapper').innerHTML
      );
      const results = parseBookSearch(bodyHTML);

      // Return book from db if item exists
      const items = [];
      for (let m of results.items) {
        const uuid = getUuidFromUrl(m.url);
        const book = await selectBookByUuid(uuid);

        if (book) {
          items.push(formatInternalBookSearchItem(book));
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

const addBook = async (request: Request, response: Response) => {
  const url = request.body.url as string;
  const uuid = getUuidFromUrl(url);

  const book = await selectBookByUuid(uuid);
  if (book) {
    response.status(400).json({ error: 'Book exists' });
    return;
  }

  try {
    const res = await axios.get(url);
    const parsedBook = await parseBook(res.data);
    const partBook = await insertBook({ uuid, ...parsedBook } as Book);
    const result = formatInternalBookSearchItem(partBook);
    response.status(200).json(result);
  } catch (e) {
    console.warn(e);
    response.status(500).json({ error: 'Error adding book' });
  }
};

async function getBook(req: Request, res: Response) {
  const bookId = req.params.bookId;
  try {
    const book = await selectBookByUuid(bookId);
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

async function getBookRating(req: Request, res: Response) {
  const uuid = req.query.uuid as string;
  const email = req.body.email as string;

  try {
    const rating = (await selectBookRating(uuid, email)) || {
      rating: null,
    };
    res.status(200).json(rating);
  } catch (e) {
    console.warn(e);
    res.status(500).json({ error: 'Error fetching book rating' });
  }
}

async function rateBook(req: Request, res: Response) {
  const prevRating = req.body.prevRating as number;
  const nextRating = req.body.nextRating as number;
  const uuid = req.body.uuid as string;
  const email = req.body.email as string;

  try {
    if (prevRating) {
      const rating = await updateBookRating(uuid, email, nextRating);
      res.status(200).json(rating);
    } else {
      const rating = await insertBookRating(uuid, email, nextRating);
      res.status(200).json(rating);
    }
  } catch (e) {
    console.warn(e);
    res.status(500).json({ error: 'Error rating book' });
  }
}

async function removeBookRating(req: Request, res: Response) {
  const uuid = req.body.uuid as string;
  const email = req.body.email as string;

  try {
    const result = await deleteBookRating(uuid, email);
    res.status(200).json({ success: result });
  } catch (e) {
    console.warn(e);
    res.status(500).json({ error: 'Error removing book rating' });
  }
}

export {
  searchBook,
  addBook,
  getBook,
  getBookRating,
  rateBook,
  removeBookRating,
};
