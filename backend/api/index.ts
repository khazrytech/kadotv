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
  var _app: any;
}

// Tunatengeneza app instance kwanza ili tuweze kuitumia kwenye serverless na listen
const app = express();

// Middleware
app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN || '*', credentials: true }));
app.use(express.json());
app.use(apiRateLimiter);

// Routes
app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));
app.use('/api/auth', authRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/admin', adminRoutes);

// Export handler kwa ajili ya serverless
export const handler = async (req: express.Request, res: express.Response) => {
  if (!global._app) {
    await connectDatabase();
    global._app = serverless(app as any);
  }
  return global._app(req, res);
};

// HII NDIYO SEHEMU YA KUIWEZESHA RENDER KUSIKILIZA KWENYE PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
