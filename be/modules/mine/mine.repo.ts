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
  const uc = `user_${category}`;
  const c_id = `${category}_id`;

  const data = await database.raw(
    `SELECT * FROM ?? AS uc
    INNER JOIN users ON users.id = uc.user_id
    INNER JOIN ?? AS c ON c.id = uc.??
    WHERE users.email = ?
    ORDER BY uc.updatedat DESC
    LIMIT 5`,
    [uc, category, c_id, email]
  );

  if (category == 'movie') {
    return data.rows.map((row: Movie) => {
      return { ...row, img: row.poster } as MyMovie;
    });
  } else {
    return data.rows;
  }

}

async function selectList(
  category: string,
  email: string
): Promise<ItemType[]> {
  const uc = `user_${category}`;
  const c_id = `${category}_id`;

  const data = await database.raw(
    `SELECT * FROM ?? AS uc
    INNER JOIN users ON users.id = uc.user_id
    INNER JOIN ?? AS c ON c.id = uc.??
    WHERE users.email = ?
    ORDER BY uc.updatedat DESC
    LIMIT 5`,
    [uc, category, c_id, email]
  );
  return data.rows;
}

export { selectTotal, selectLatestFive, selectList };
