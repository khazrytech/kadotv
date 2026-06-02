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
  await connectDatabase();

  const app = express();
  const server = http.createServer(app);
  const io = new Server(server, {
    cors: { origin: '*' }
  });

  app.use(helmet());
  app.use(cors({ origin: '*' }));
  app.use(express.json());
  app.use(apiRateLimiter);

  app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));
  app.use('/api/auth', authRoutes);
  app.use('/api/media', mediaRoutes);
  app.use('/api/admin', adminRoutes);

  io.on('connection', socket => {
    console.log('Socket connected:', socket.id);
    socket.emit('live-notification', { message: 'Welcome to KadoTV premium live edge.' });
  });

  server.listen(PORT, () => {
    console.log(`🚀 Backend listening on http://localhost:${PORT}`);
  });
}

start().catch(error => {
  console.error('Startup error:', error);
  process.exit(1);
});
