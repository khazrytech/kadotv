import { Request, Response } from 'express';

export function errorHandler(err: any, _req: Request, res: Response) {
  console.error('Error:', err);
  const status = err.status || 500;
  const message = err.message || 'Internal Server Error';
  res.status(status).json({ error: message, ...(process.env.NODE_ENV === 'development' && { stack: err.stack }) });
}
