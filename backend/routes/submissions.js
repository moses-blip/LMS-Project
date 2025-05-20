const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');

// Placeholder routes - will be implemented later
router.use(protect);

router.route('/')
    .get((req, res) => {
        res.json({ message: 'Get all submissions' });
    })
    .post(authorize('student'), (req, res) => {
        res.json({ message: 'Create submission' });
    });

router.route('/:id')
    .get((req, res) => {
        res.json({ message: 'Get single submission' });
    })
    .put(authorize('student'), (req, res) => {
        res.json({ message: 'Update submission' });
    })
    .delete(authorize('student'), (req, res) => {
        res.json({ message: 'Delete submission' });
    });

module.exports = router; 