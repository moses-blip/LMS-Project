import express from 'express';
import { getMessages, sendMessage, markAsRead } from '../controllers/messageController.js';
import authenticate from '../middleware/authMiddleware.js';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Get messages between two users
router.get('/:otherUserId', getMessages);

// Send a new message
router.post('/', sendMessage);

// Mark messages as read
router.put('/:senderId/read', markAsRead);

export default router; 