import express from 'express';
import {
  getAllMenuItems,
  getMenuItemById,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem
} from '../controllers/menuController.js';
import { verifyToken, verifyAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getAllMenuItems);
router.get('/:id', getMenuItemById);

// Admin-only routes (Protected)
router.post('/', verifyToken, verifyAdmin, createMenuItem);
router.put('/:id', verifyToken, verifyAdmin, updateMenuItem);
router.delete('/:id', verifyToken, verifyAdmin, deleteMenuItem);

export default router;
