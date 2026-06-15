import { Router, Request, Response } from 'express';
import { Media } from '../models/Media';

const router = Router();

// 1. POST /api/media - Create new media (Admin Key Protected)
router.post('/', async (req: Request, res: Response) => {
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

// 2. GET /api/media - Kupata list ya muvi zote
router.get('/', async (req: Request, res: Response) => {
    try {
      const media = await Media.find().sort({ createdAt: -1 });
      res.json({ data: media });
    } catch (err) {
      res.status(500).json({ message: 'Server error' });
    }
});

// 3. GET /api/media/:id - KUPATA MUVI MOJA (Hii ndiyo fix ya 404!)
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const media = await Media.findById(id);
    
    if (!media) {
      return res.status(404).json({ message: 'Muvi haipatikani kwenye database' });
    }
    
    res.json(media);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
});

export default router;
