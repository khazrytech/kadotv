import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import serverless from 'serverless-http';
import { connectDatabase } from '../src/db';
import { apiRateLimiter } from '../src/middleware/rateLimiter';
import authRoutes from '../src/routes/auth';
import mediaRoutes from '../src/routes/media';
import adminRoutes from '../src/routes/admin';

declare global {
  var _app: ReturnType<typeof serverless<ReturnType<typeof express>>>;
}

export const handler = async (req: express.Request, res: express.Response) => {
  if (!global._app) {
    await connectDatabase();
    const app = express();
    app.use(helmet());
    app.use(cors({ origin: process.env.CORS_ORIGIN || '*', credentials: true }));
    app.use(express.json());
    app.use(apiRateLimiter);

    app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));
    app.use('/api/auth', authRoutes);
    app.use('/api/media', mediaRoutes);
    app.use('/api/admin', adminRoutes);

    global._app = serverless(app);
  }
  return global._app(req, res);
};
