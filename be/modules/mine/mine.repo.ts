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

async function selectMyList(
  category: string,
  count: string,
  offset: string,
  sort: string,
  email: string
): Promise<MyType[]> {
  const userCategory = `user_${category}`;
  const categoryId = `${category}_id`;
  let sortColumn;
  switch (sort) {
    case 'time':
      sortColumn = 'updatedat';
      break;
    case 'rating':
      sortColumn = 'rating';
  }

  const data = await database.raw(
    `SELECT * FROM ?? AS uc
    INNER JOIN users ON users.id = uc.user_id
    INNER JOIN ?? AS c ON c.id = uc.??
    WHERE users.email = ?
    ORDER BY uc.?? DESC, uc.updatedat DESC
    LIMIT ?
    OFFSET ?`,
    [userCategory, category, categoryId, email, sortColumn, count, offset]
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
