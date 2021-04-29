import { Subject } from 'be/be/lib/constant';
import database from '../../database';

async function selectItemByUuid(
  category: string,
  uuid: string
): Promise<Subject> {
  const data = await database.raw('SELECT * FROM ?? WHERE uuid = ?', [
    category,
    uuid,
  ]);
  return data.rows[0];
}

export { selectItemByUuid };
