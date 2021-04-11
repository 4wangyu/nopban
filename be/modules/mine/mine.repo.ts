import database from '../../database';
import { MyBook } from '../../models/book.model';
import { Movie, MyMovie } from '../../models/movie.model';
import { MyMusic } from '../../models/music.model';

type MyItemType = MyBook | MyMovie | MyMusic;

async function selectTotal(category: string, email: string): Promise<number> {
  const userCategory = `user_${category}`;
  const categoryId = `${category}_id`;

  const data = await database.raw(
    `SELECT COUNT(*) AS total FROM ?? AS uc
    INNER JOIN users ON users.id = uc.user_id
    INNER JOIN ?? AS c ON c.id = uc.??
    WHERE users.email = ?`,
    [userCategory, category, categoryId, email]
  );
  return +data.rows[0].total;
}

async function selectLatestFive(
  category: string,
  email: string
): Promise<MyItemType[]> {
  const userCategory = `user_${category}`;
  const categoryId = `${category}_id`;

  const data = await database.raw(
    `SELECT * FROM ?? AS uc
    INNER JOIN users ON users.id = uc.user_id
    INNER JOIN ?? AS c ON c.id = uc.??
    WHERE users.email = ?
    ORDER BY uc.updatedat DESC
    LIMIT 5`,
    [userCategory, category, categoryId, email]
  );

  if (category == 'movie') {
    return data.rows.map((row: Movie) => {
      return { ...row, img: row.poster } as MyMovie;
    });
  } else {
    return data.rows;
  }
}

async function selectSubList(
  category: string,
  count: string,
  offset: string,
  email: string
): Promise<MyItemType[]> {
  const userCategory = `user_${category}`;
  const categoryId = `${category}_id`;

  const data = await database.raw(
    `SELECT * FROM ?? AS uc
    INNER JOIN users ON users.id = uc.user_id
    INNER JOIN ?? AS c ON c.id = uc.??
    WHERE users.email = ?
    ORDER BY uc.updatedat DESC
    LIMIT ?
    OFFSET ?`,
    [userCategory, category, categoryId, email, count, offset]
  );

  if (category == 'movie') {
    return data.rows.map((row: Movie) => {
      return { ...row, img: row.poster } as MyMovie;
    });
  } else {
    return data.rows;
  }
}

export { selectTotal, selectLatestFive, selectSubList };
