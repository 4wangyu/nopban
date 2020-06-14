import database from '../../database';
import { Music } from '../../models/music.model';

async function insertMusic(music: Music): Promise<Partial<Music>> {
  const data = await database.raw(
    `INSERT INTO book (uuid, title, img, writers, publisher, 
      subtitle, origin_title, translators, publish_time, 
      page_count, price, isbn, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    RETURNING uuid, title, subtitle, writers, translators, 
      publisher, publish_time, price, img`,
    [
      music.uuid,
      music.title,
      music.img,
      JSON.stringify(music.writers),
      music.publisher,
      music.subtitle,
      music.origin_title,
      JSON.stringify(music.translators),
      music.publish_time,
      music.page_count,
      music.price,
      music.isbn,
      new Date(),
    ]
  );

  return data.rows[0];
}

async function selectMusicByUuid(uuid: string): Promise<Music> {
  const data = await database.raw('SELECT * FROM book WHERE uuid = ?', [uuid]);
  return data.rows[0];
}

async function selectMusicRating(
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

async function insertMusicRating(
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

async function updateMusicRating(
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

async function deleteMusicRating(
  uuid: string,
  email: string
): Promise<boolean> {
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
  insertMusic,
  selectMusicByUuid,
  selectMusicRating,
  insertMusicRating,
  updateMusicRating,
  deleteMusicRating,
};
