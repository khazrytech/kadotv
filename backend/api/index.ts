import express from 'express';
import http from 'http';
import cors from 'cors';
import helmet from 'helmet';
import { Server } from 'socket.io';
import { connectDatabase } from './db';
import { PORT } from './config';
import { apiRateLimiter } from './middleware/rateLimiter';
import authRoutes from './routes/auth';
import mediaRoutes from './routes/media';
import adminRoutes from './routes/admin';

async function start() {
  try {
    // 1. Hakikisha tunasubiri database iunganishwe KWANZA kabisa
    console.log("🔄 Starting database connection...");
    await connectDatabase();
    console.log("🔋 Database ready, initializing Express...");

    const app = express();
    
    // Express iamini proxy ya Render
    app.set('trust proxy', 1);

    const server = http.createServer(app);
    const io = new Server(server, {
      cors: { origin: '*' }
    });

    app.use(helmet());
    app.use(cors({ origin: '*' }));
    app.use(express.json());
    app.use(apiRateLimiter);

    app.get('/api/health', (_req: express.Request, res: express.Response) => res.json({ status: 'ok' }));
    app.use('/api/auth', authRoutes);
    app.use('/api/media', mediaRoutes);
    app.use('/api/admin', adminRoutes);

    io.on('connection', (socket) => {
      console.log('Socket connected:', socket.id);
      socket.emit('live-notification', { message: 'Welcome to KadoTV premium live edge.' });
    });

    // 2. Server inaanza kusikiliza HAPA baada ya kila kitu kuwa sawa
    server.listen(PORT, () => {
      console.log(`🚀 Backend listening on port ${PORT}`);
    });

  } catch (error) {
    console.error('❌ Critical startup error:', error);
    process.exit(1);
  }
}

start();
