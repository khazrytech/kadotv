import rateLimit from 'express-rate-limit';

export const apiRateLimiter = rateLimit({
  windowMs: 1000 * 60,
  max: 120,
  standardHeaders: true,
  legacyHeaders: false,
  message: 'Too many requests, please try again later.'
});
