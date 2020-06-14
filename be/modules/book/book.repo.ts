import database from '../../database';
import { Book } from '../../models/book.model';

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

async function selectBookRating(
  uuid: string,
  email: string
): Promise<{ rating: number }> {
  const data = await database.raw(
    `SELECT um.rating FROM user_movie um
    INNER JOIN users ON users.id = um.user_id
    INNER JOIN movie ON movie.id = um.movie_id
    WHERE users.email = ?
    AND movie.uuid = ?`,
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
    `INSERT INTO user_movie( user_id, movie_id, rating, updatedat, createdat)
    SELECT users.id, movie.id, ?, ?, ?
    FROM users, movie
    WHERE users.email = ?
    AND movie.uuid = ?
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
    `UPDATE user_movie um
    SET rating = ?, updatedat = ?
    WHERE um.user_id = (SELECT id FROM users WHERE users.email = ?)
    AND um.movie_id = (SELECT id FROM movie WHERE movie.uuid = ?)
    RETURNING rating
    `,
    [rating, date, email, uuid]
  );

  return data.rows[0];
}

async function deleteBookRating(uuid: string, email: string): Promise<boolean> {
  await database.raw(
    `DELETE FROM user_movie um
    WHERE um.user_id = (SELECT id FROM users WHERE users.email = ?)
    AND um.movie_id = (SELECT id FROM movie WHERE movie.uuid = ?)
    `,
    [email, uuid]
  );

  return true;
}

export {
  insertBook,
  selectBookByUuid,
  selectBookRating,
  insertBookRating,
  updateBookRating,
  deleteBookRating,
};
