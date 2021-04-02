import { Book } from '../../models/book.model';
import { Movie, MyMovie } from '../../models/movie.model';
import { Music } from '../../models/music.model';
import database from '../../database';

type ItemType = Book | MyMovie | Music;

async function selectTotal(
  category: string,
  email: string
): Promise<{ total: number }> {
  const table = `user_${category}`;
  const data = await database.raw(
    `SELECT COUNT(*) AS total FROM ?? AS uc
    INNER JOIN users ON users.id = uc.user_id
    WHERE users.email = ?`,
    [table, email]
  );
  return data.rows[0];
}

async function selectLatestFive(
  category: string,
  email: string
): Promise<ItemType[]> {
  let data;
  switch (category) {
    case 'book':
      data = await database.raw(
        `SELECT * FROM user_book AS uc
        INNER JOIN users ON users.id = uc.user_id
        INNER JOIN book ON book.id = uc.book_id
        WHERE users.email = ?
        ORDER BY uc.updatedat DESC
        LIMIT 5`,
        [email]
      );
      return data.rows;
    case 'movie':
      data = await database.raw(
        `SELECT * FROM user_movie AS uc
        INNER JOIN users ON users.id = uc.user_id
        INNER JOIN movie ON movie.id = uc.movie_id
        WHERE users.email = ?
        ORDER BY uc.updatedat DESC
        LIMIT 5`,
        [email]
      );
      return data.rows.map((row: Movie) => {
        return {...row, img: row.poster} as MyMovie;
      });
    case 'music':
      data = await database.raw(
        `SELECT * FROM user_music AS uc
        INNER JOIN users ON users.id = uc.user_id
        INNER JOIN music ON music.id = uc.music_id
        WHERE users.email = ?
        ORDER BY uc.updatedat DESC
        LIMIT 5`,
        [email]
      );
      return data.rows;
  }
}


async function selectPagination(
  category: string,
  email: string
): Promise<ItemType[]> {
  let data;
  switch (category) {
    case 'book':
      data = await database.raw(
        `SELECT * FROM user_book AS uc
        INNER JOIN users ON users.id = uc.user_id
        INNER JOIN book ON book.id = uc.book_id
        WHERE users.email = ?
        ORDER BY uc.updatedat DESC
        LIMIT 5`,
        [email]
      );
      return data.rows;
    case 'movie':
      data = await database.raw(
        `SELECT * FROM user_movie AS uc
        INNER JOIN users ON users.id = uc.user_id
        INNER JOIN movie ON movie.id = uc.movie_id
        WHERE users.email = ?
        ORDER BY uc.updatedat DESC
        LIMIT 5`,
        [email]
      );
      return data.rows;
    case 'music':
      data = await database.raw(
        `SELECT * FROM user_music AS uc
        INNER JOIN users ON users.id = uc.user_id
        INNER JOIN music ON music.id = uc.music_id
        WHERE users.email = ?
        ORDER BY uc.updatedat DESC
        LIMIT 5`,
        [email]
      );
      return data.rows;
  }
}

export { selectTotal, selectLatestFive, selectPagination };
