// ... import zako zote zibaki vile vile ...

async function start() {
  try {
    // 1. Hakikisha tunasubiri database iunganishwe KWANZA kabisa
    console.log("🔄 Starting database connection...");
    await connectDatabase();
    console.log("🔋 Database ready, initializing Express...");

    const app = express();
    
    app.set('trust proxy', 1);

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
