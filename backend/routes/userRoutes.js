import express from 'express';
import { getLecturers, getStudents } from '../controllers/userController.js';
import authenticate from '../middleware/authMiddleware.js';

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Get all lecturers
router.get('/lecturers', getLecturers);

// Get all students
router.get('/students', getStudents);

export default router; 