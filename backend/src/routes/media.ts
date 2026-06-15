import { Router, Request, Response } from 'express';
import { Media } from '../models/Media';

const router = Router();

// POST /api/media - create new media (Admin Key Protected)
router.post('/', async (req: Request, res: Response) => {
  // Angalia Admin Key kutoka kwenye header
  const adminKey = req.headers['x-admin-key'];
  
  if (adminKey !== 'KADOTV_SECRET_2026') {
    return res.status(401).json({ message: 'Unauthorized: Access Denied' });
  }

  try {
    const media = new Media({ ...req.body });
    await media.save();
    res.status(201).json(media);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Invalid data' });
  }
});

// Hizi njia nyingine ziache kama zilivyo
router.get('/', async (req: Request, res: Response) => {
    try {
      const media = await Media.find().sort({ createdAt: -1 });
      res.json({ data: media });
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
});

export default router;
