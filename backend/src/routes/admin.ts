import { Router, Request, Response } from 'express';
import { Media } from '../models/Media';

const router = Router();

router.post('/add-movie', async (req: Request, res: Response) => {
  const adminKey = req.headers['x-admin-key'];
  
  if (adminKey !== 'KADOTV_SECRET_2026') {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const media = new Media(req.body);
    await media.save();
    res.status(201).json({ success: true, message: 'Imefanikiwa' });
  } catch (err) {
    res.status(400).json({ message: 'Invalid data' });
  }
});

export default router;
