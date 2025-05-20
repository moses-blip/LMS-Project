const express = require('express');
const router = express.Router();
const {
    getCourses,
    getCourse,
    createCourse,
    updateCourse,
    deleteCourse,
    enrollInCourse,
    unenrollFromCourse
} = require('../controllers/courseController');
const { protect, authorize } = require('../middleware/auth');

router.use(protect);

router.route('/')
    .get(getCourses)
    .post(authorize('admin', 'lecturer'), createCourse);

router.route('/:id')
    .get(getCourse)
    .put(authorize('admin', 'lecturer'), updateCourse)
    .delete(authorize('admin'), deleteCourse);

router.route('/:id/enroll')
    .post(authorize('student'), enrollInCourse)
    .delete(authorize('student'), unenrollFromCourse);

module.exports = router; 