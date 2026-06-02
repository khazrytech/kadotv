import express, { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { body, validationResult } from 'express-validator';
import { User } from '../models/User';
import { JWT_SECRET } from '../config';
import { authenticateToken, AuthRequest } from '../middleware/auth';

const router = express.Router();

// Helper to generate JWT tokens
const generateToken = (userId: string, role: string) => {
  const secret = JWT_SECRET || process.env.JWT_SECRET || 'default_secret';
  return jwt.sign({ id: userId, role }, secret, { expiresIn: '7d' });
};

/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 */
router.post(
  '/register',
  [
    body('email').isEmail().withMessage('Valid email required'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters'),
    body('name').notEmpty().withMessage('Name is required')
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password, name } = req.body;
    try {
      const existing = await User.findOne({ email });
      if (existing) {
        return res.status(409).json({ message: 'User already exists' });
      }
      const hashed = await bcrypt.hash(password, 10);
      const user = new User({ email, password: hashed, name, role: 'user' });
      await user.save();
      const token = generateToken(user.id, user.role);
      return res.status(201).json({
        token,
        user: { id: user.id, email: user.email, name: user.name, role: user.role }
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Server error' });
    }
  }
);

/**
 * @route POST /api/auth/login
 * @desc Login user and return JWT
 * @access Public
 */
router.post(
  '/login',
  [body('email').isEmail(), body('password').exists()],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
      const token = generateToken(user.id, user.role);
      return res.json({
        token,
        user: { id: user.id, email: user.email, name: user.name, role: user.role }
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Server error' });
    }
  }
);

// Get current user profile
router.get('/me', authenticateToken, async (req: AuthRequest, res: Response) => {
  const user = await User.findById(req.user?.id).select('-password');
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json({ user });
});

export default router;
