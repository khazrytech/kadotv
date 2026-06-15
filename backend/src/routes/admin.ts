import { Router, Request, Response } from 'express';
import { Media } from '../models/Media';

const router = Router();

// Hii ndiyo API route kwa ajili ya kuongeza movie
router.post('/add-movie', async (req: Request, res: Response) => {
  const adminKey = req.headers['x-admin-key'];
  
  // Ulinzi: Inahitaji 'KADOTV_SECRET_2026'
  if (adminKey !== 'KADOTV_SECRET_2026') {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const media = new Media({ ...req.body });
    await media.save();
    res.status(201).json(media);
  } catch (err) {
    console.error('Error saving media:', err);
    res.status(400).json({ message: 'Invalid data' });
  }
});

export default router;
