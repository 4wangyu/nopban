import { Request, Response, NextFunction } from 'express';

const validateCategory = (req: Request, res: Response, next: NextFunction) => {
  const CATEGORY_LIST = ['book', 'movie', 'music'];

  let category = req.query.category as string;
  if (CATEGORY_LIST.includes(category)) {
    next();
  } else {
    return res.status(404).json({
      error: 'Category not found.',
    });
  }
};

export { validateCategory };
