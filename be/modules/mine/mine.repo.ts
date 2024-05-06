import { MyType } from 'be/be/lib/constant';
import database from '../../database';
import { Movie, MyMovie } from '../../models/movie.model';

async function selectMyTotal(category: string, email: string): Promise<number> {
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

async function selectMyLatestFive(
  category: string,
  email: string
): Promise<MyType[]> {
  const userCategory = `user_${category}`;
  const categoryId = `${category}_id`;

  const data = await database.raw(
    `SELECT * FROM ?? AS uc
    INNER JOIN users ON users.id = uc.user_id
    INNER JOIN ?? AS c ON c.id = uc.??
    WHERE users.email = ?
    ORDER BY uc.createdat DESC
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

async function selectMyList(
  category: string,
  count: string,
  offset: string,
  sortBy: string,
  email: string
): Promise<MyType[]> {
  const userCategory = `user_${category}`;
  const categoryId = `${category}_id`;
  let sortByColumn;
  if (sortBy === 'time') {
    sortByColumn = 'createdat';
  } else if (sortBy === 'rating') {
    sortByColumn = 'rating';
  }

  const data = await database.raw(
    `SELECT * FROM ?? AS uc
    INNER JOIN users ON users.id = uc.user_id
    INNER JOIN ?? AS c ON c.id = uc.??
    WHERE users.email = ?
    ORDER BY uc.?? DESC, uc.updatedat DESC
    LIMIT ?
    OFFSET ?`,
    [userCategory, category, categoryId, email, sortByColumn, count, offset]
  );

  if (category == 'movie') {
    return data.rows.map((row: Movie) => {
      return { ...row, img: row.poster } as MyMovie;
    });
  } else {
    return data.rows;
  }
}

export { selectMyTotal, selectMyLatestFive, selectMyList };
