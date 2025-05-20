const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');

// Placeholder routes - will be implemented later
router.use(protect);

router.route('/')
    .get((req, res) => {
        res.json({ message: 'Get all grades' });
    })
    .post(authorize('instructor'), (req, res) => {
        res.json({ message: 'Create grade' });
    });

router.route('/:id')
    .get((req, res) => {
        res.json({ message: 'Get single grade' });
    })
    .put(authorize('instructor'), (req, res) => {
        res.json({ message: 'Update grade' });
    })
    .delete(authorize('instructor'), (req, res) => {
        res.json({ message: 'Delete grade' });
    });

module.exports = router; 