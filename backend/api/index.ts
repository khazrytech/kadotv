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

const app = express();

// Express iamini proxy ya Render ili rate limiter isilete shida
app.set('trust proxy', 1);

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

// Export handler kwa ajili ya serverless (Vercel n.k)
export const handler = async (req: any, res: any) => {
  if (!global._app) {
    await connectDatabase();
    global._app = serverless(app as any);
  }
  return global._app(req, res);
};

// HII NDIYO SEHEMU YA RENDER
const PORT = process.env.PORT || 10000;

async function startRenderServer() {
  try {
    console.log("🔄 [Render] Inajaribu kuunganisha database...");
    await connectDatabase();
    
    app.listen(PORT, () => {
      console.log(`🚀 [Render] Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ [Render] Server imefeli kuwaka:", error);
    process.exit(1);
  }
}

// Tunawasha server ya Render
startRenderServer();
