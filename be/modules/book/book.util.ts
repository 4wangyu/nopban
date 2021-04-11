import { arrToStr, getName } from '../../lib/util';
import {
  Book,
  BookItemType,
  BookSearchItemType,
  MyBook,
  MyBookItemType,
} from '../../models/book.model';

function formatBookItem(book: Partial<Book>): BookItemType {
  const url = book.uuid;

  const subtitle = book.subtitle ? ' : ' + book.subtitle : '';
  const title = book.title + subtitle;

  const metas = [];
  const meta = getName(book.writers)
    .slice(0, 2)
    .concat(getName(book.translators).slice(0, 2))
    .concat([book.publisher, book.publish_time, book.price]);
  metas.push(arrToStr(meta));

  const img = book.img;
  return { url, title, metas, img };
}

function formatInternalBookSearchItem(book: Partial<Book>): BookSearchItemType {
  const bookItem = formatBookItem(book);
  return { ...bookItem, saved: true };
}

function formatMyBookItem(book: Partial<MyBook>): MyBookItemType {
  const bookItem = formatBookItem(book);
  return { ...bookItem, rating: book.rating };
}

export { formatBookItem, formatInternalBookSearchItem, formatMyBookItem };
