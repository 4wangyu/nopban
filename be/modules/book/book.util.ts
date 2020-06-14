import { arrToStr, getName } from '../../lib/util';
import { BookSearchItem, Book } from '../../models/book.model';

function formatBookSearchItem(book: Partial<Book>): BookSearchItem {
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
  const saved = true;
  return { url, title, metas, img, saved };
}

export { formatBookSearchItem };
