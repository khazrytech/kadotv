// backend/src/routes/admin.ts
import { Router } from 'express';
import { Media } from '../models/Media';
import { User } from '../models/User';
import { authenticateToken } from '../middleware/auth';
import { requireAdmin } from '../middleware/role';

const router = Router();

// Apply auth + admin middleware to all routes in this file
router.use(authenticateToken);
router.use(requireAdmin);

// ----- Statistics -----
router.get('/stats', async (_req, res) => {
  try {
    const users = await User.countDocuments();
    const media = await Media.countDocuments();
    const live = await Media.countDocuments({ live: true });
    res.json({ users, media, live });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ----- User Management -----
router.get('/users', async (_req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json({ users });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/users/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ----- Media Creation (admin) -----
router.post('/media', async (req, res) => {
  try {
    const body = req.body;
    const item = await Media.create({
      title: body.title,
      description: body.description,
      category: body.category,
      type: body.type,
      posterUrl: body.posterUrl,
      videoUrl: body.videoUrl,
      previewUrl: body.previewUrl,
      rating: body.rating || 0,
      tags: body.tags || [],
      featured: body.featured || false,
      live: body.live || false
    });
    res.status(201).json(item);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Invalid data' });
  }
});

// ----- Media Flag Toggles -----
router.patch('/media/:id/feature', async (req, res) => {
  try {
    const media = await Media.findByIdAndUpdate(req.params.id, { featured: true }, { new: true });
    res.json({ media });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.patch('/media/:id/unfeature', async (req, res) => {
  try {
    const media = await Media.findByIdAndUpdate(req.params.id, { featured: false }, { new: true });
    res.json({ media });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.patch('/media/:id/live', async (req, res) => {
  try {
    const media = await Media.findByIdAndUpdate(req.params.id, { live: true }, { new: true });
    res.json({ media });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.patch('/media/:id/unlive', async (req, res) => {
  try {
    const media = await Media.findByIdAndUpdate(req.params.id, { live: false }, { new: true });
    res.json({ media });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
