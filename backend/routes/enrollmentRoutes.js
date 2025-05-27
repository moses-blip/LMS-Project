import express from 'express';
import {
  getStudents,
  getCourses,
  assignCourse,
  removeEnrollment,
} from '../controllers/enrollmentController.js';

const router = express.Router();

router.get('/students', getStudents);
router.get('/courses', getCourses);
router.post('/assign', assignCourse);
router.delete('/remove', removeEnrollment);

export default router;
