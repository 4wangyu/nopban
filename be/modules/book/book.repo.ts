import database from '../../database';
import { Book } from '../../models/book.model';
import { ITEM_COUNT_PER_PAGE } from '../../config';

async function insertBook(book: Book): Promise<Partial<Book>> {
  const data = await database.raw(
    `INSERT INTO book (uuid, title, img, writers, publisher, 
      subtitle, origin_title, translators, publish_time, 
      page_count, price, isbn, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    RETURNING uuid, title, subtitle, writers, translators, 
      publisher, publish_time, price, img`,
    [
      book.uuid,
      book.title,
      book.img,
      JSON.stringify(book.writers),
      book.publisher,
      book.subtitle,
      book.origin_title,
      JSON.stringify(book.translators),
      book.publish_time,
      book.page_count,
      book.price,
      book.isbn,
      new Date(),
    ]
  );

  return data.rows[0];
}

async function selectBookByUuid(uuid: string): Promise<Book> {
  const data = await database.raw('SELECT * FROM book WHERE uuid = ?', [uuid]);
  return data.rows[0];
}

async function selectBookByTitle(
  searchKey: string,
  start: number
): Promise<Book[]> {
  const data = (await database
    .table('book')
    .whereRaw(`lower(title) like '%${searchKey.toLowerCase()}%'`)
    .limit(ITEM_COUNT_PER_PAGE)
    .offset(start)) as Book[];
  return data;
}

async function selectBookRating(
  uuid: string,
  email: string
): Promise<{ rating: number }> {
  const data = await database.raw(
    `SELECT ub.rating FROM user_book ub
    INNER JOIN users ON users.id = ub.user_id
    INNER JOIN book ON book.id = ub.book_id
    WHERE users.email = ?
    AND book.uuid = ?`,
    [email, uuid]
  );

  return data.rows[0];
}

async function insertBookRating(
  uuid: string,
  email: string,
  rating: number
): Promise<{ rating: number }> {
  const date = new Date();

  const data = await database.raw(
    `INSERT INTO user_book( user_id, book_id, rating, updatedat, createdat)
    SELECT users.id, book.id, ?, ?, ?
    FROM users, book
    WHERE users.email = ?
    AND book.uuid = ?
    RETURNING rating`,
    [rating, date, date, email, uuid]
  );
  return data.rows[0];
}

async function updateBookRating(
  uuid: string,
  email: string,
  rating: number
): Promise<{ rating: number }> {
  const date = new Date();

  const data = await database.raw(
    `UPDATE user_book ub
    SET rating = ?, updatedat = ?
    WHERE ub.user_id = (SELECT id FROM users WHERE users.email = ?)
    AND ub.book_id = (SELECT id FROM book WHERE book.uuid = ?)
    RETURNING rating
    `,
    [rating, date, email, uuid]
  );

  return data.rows[0];
}

async function deleteBookRating(uuid: string, email: string): Promise<boolean> {
  await database.raw(
    `DELETE FROM user_book ub
    WHERE ub.user_id = (SELECT id FROM users WHERE users.email = ?)
    AND ub.book_id = (SELECT id FROM book WHERE book.uuid = ?)
    `,
    [email, uuid]
  );

  return true;
}

export {
  insertBook,
  selectBookByUuid,
  selectBookByTitle,
  selectBookRating,
  insertBookRating,
  updateBookRating,
  deleteBookRating,
};
