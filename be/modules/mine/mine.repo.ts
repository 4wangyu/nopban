import database from '../../database';

async function selectTotal(
  category: string,
  email: string
): Promise<{ total: number }> {
  console.log(email)
  const table = `user_${category}`;
  const data = await database.raw(
    `SELECT COUNT(*) AS total FROM ?? AS uc
    INNER JOIN users ON users.id = uc.user_id
    WHERE users.email = ?`,
    [table, email]
  );
  return data.rows[0];
}

export { selectTotal };
