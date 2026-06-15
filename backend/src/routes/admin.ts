import { Router, Request, Response } from 'express';
import { Media } from '../models/Media';

const router = Router();

// Middleware ya ku-check Admin Key (kama tulivyokubaliana)
const checkAdminKey = (req: Request, res: Response, next: any) => {
  const adminKey = req.headers['x-admin-key'];
  if (adminKey !== 'KADOTV_SECRET_2026') {
    return res.status(401).json({ message: 'Unauthorized: Admin Key invalid' });
  }
  next();
};

// Route ya kuongeza movie (Hii ndio ile inayohitajika na Frontend yako)
router.post('/add-movie', checkAdminKey, async (req: Request, res: Response) => {
  try {
    const media = new Media({ ...req.body });
    await media.save();
    res.status(201).json(media);
  } catch (err) {
    console.error('Error saving media:', err);
    res.status(400).json({ message: 'Invalid data' });
  }
});

// Route ya kupata stats za admin (kama utahitaji baadaye)
router.get('/stats', checkAdminKey, async (req: Request, res: Response) => {
  try {
    const count = await Media.countDocuments();
    res.json({ totalMedia: count });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
