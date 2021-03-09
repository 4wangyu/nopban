import database from '../../database';

async function selectTotal(category: string): Promise<{ total: number }> {
  const table = `user_${category}`;
  const data = await database.raw(`SELECT COUNT(id) AS total FROM ??`, [table]);
  return data.rows[0];
}

export { selectTotal };
