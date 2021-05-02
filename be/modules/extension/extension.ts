import { Request, Response } from 'express';
import { selectItemByUuid } from './extension.repo';

const checkItemExist = async (request: Request, response: Response) => {
  const category = request.query.category as string;
  const uuid = request.query.uuid as string;

  try {
    const item = await selectItemByUuid(category, uuid);
    if (item) {
      response.status(200).json({ result: true });
    } else {
      response.status(200).json({ result: false });
    }
  } catch (e) {
    console.warn(e);
    response.status(500).json({ error: 'Error searching item in database' });
  }
};

export { checkItemExist };
