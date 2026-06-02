import { Router, Request, Response } from 'express';
import { Media } from '../models/Media';
import { AuthRequest, authenticateToken, requireAdmin } from '../middleware/auth';

const router = Router();

// GET /api/media - list media with pagination & optional filters
router.get('/', async (req: Request, res: Response) => {
  try {
    const { page = '1', limit = '20', type, category } = req.query;
    const pageNum = parseInt(page as string, 10);
    const limitNum = parseInt(limit as string, 10);
    const filter: any = {};
    if (type) filter.type = type;
    if (category) filter.category = category;
    const media = await Media.find(filter)
      .skip((pageNum - 1) * limitNum)
      .limit(limitNum)
      .sort({ createdAt: -1 });
    const total = await Media.countDocuments(filter);
    res.json({ total, page: pageNum, limit: limitNum, data: media });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/media/:id - single media item
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const media = await Media.findById(req.params.id);
    if (!media) return res.status(404).json({ message: 'Media not found' });
    res.json(media);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/media - create new media (auth required)
router.post('/', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const media = new Media({ ...req.body, featured: false, live: false });
    await media.save();
    res.status(201).json(media);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Invalid data' });
  }
});

// PUT /api/media/:id - update media (auth required, admin can edit any, users can edit own?)
router.put('/:id', authenticateToken, async (req: AuthRequest, res: Response) => {
  try {
    const media = await Media.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!media) return res.status(404).json({ message: 'Media not found' });
    res.json(media);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Invalid update' });
  }
});

// DELETE /api/media/:id - delete media (admin only)
router.delete('/:id', authenticateToken, requireAdmin, async (req: AuthRequest, res: Response) => {
  try {
    const media = await Media.findByIdAndDelete(req.params.id);
    if (!media) return res.status(404).json({ message: 'Media not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
