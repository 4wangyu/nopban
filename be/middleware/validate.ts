import { NextFunction, Request, Response } from 'express';
import { CATEGORIES } from '../lib/constant';

const validateCategory = (req: Request, res: Response, next: NextFunction) => {
  const category = req.query.category as string;
  if (CATEGORIES.includes(category)) {
    next();
  } else {
    return res.status(404).json({
      error: 'Category not found.',
    });
  }
};

export { validateCategory };
