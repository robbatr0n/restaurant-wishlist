import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import expressAsyncHandler from 'express-async-handler';
import User from '@src/models/userModel';

const protect = expressAsyncHandler(async (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.jwt;

  if (token) {
    try {
      if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET must be defined');
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
      req.user = await User.findById(decoded.userId).select('-password');
      return next();
    } catch (error) {
      res.status(401);
      throw new Error('Not authorised, Invalid token');
    }
  } else {
    res.status(401);
    throw new Error('Not authorised, no token');
  }
});

export { protect };
