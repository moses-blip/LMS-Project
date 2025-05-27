import express from 'express';
import authenticate from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';
import * as lecturerController from '../controllers/lecturerController.js';

const router = express.Router();

router.get(
  '/dashboard',
  authenticate,
  authorize('LECTURER', 'ADMIN'),
  lecturerController.getDashboardData
);

export default router;
