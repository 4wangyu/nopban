import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
require('dotenv').config();

function getToken(req: Request): string {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    return req.headers.authorization.split(' ')[1];
  } else {
    return null;
  }
}

const checkToken = (req: Request, res: Response, next: NextFunction) => {
  let token = getToken(req);

  if (!token) {
    return res.status(401).json({
      error: 'Not authorized.',
    });
  }

  if (token) {
    jwt.verify(
      token,
      process.env.SECRET as string,
      (err: any, decoded: any) => {
        if (err) {
          return res.status(401).json({
            error: 'Invalid token.',
          });
        } else {
          req.body.email = decoded.email;
          next();
        }
      }
    );
  }
};

export default checkToken;
