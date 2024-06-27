import { Request, Response, NextFunction } from 'express';

/**
 * route not found
 * @param req {Request}
 * @param res {Response}
 * @param next {NextFunction}
 */
const notFound = (req: Request, res: Response, next: NextFunction): void => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

/**
 * handles general errors
 * @param err {Error}
 * @param req {Request}
 * @param res {Response}
 * @param next {NextFunction}
 */
const errorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction): void => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  const message = err.message;

  res.status(statusCode).json({
    message: message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

export { notFound, errorHandler };
