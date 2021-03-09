import { Request, Response } from 'express';
import {
    selectTotal,
  } from './mine.repo';

async function getTotal(req: Request, res: Response) {
    const category = req.params.category;
    const total = await selectTotal(category);
    res.status(200).json(total)
}

export {
  getTotal
};