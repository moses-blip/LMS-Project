const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');

// Placeholder routes - will be implemented later
router.use(protect);

router.route('/')
    .get((req, res) => {
        res.json({ message: 'Get all assignments' });
    })
    .post(authorize('admin', 'lecturer'), (req, res) => {
        res.json({ message: 'Create assignment' });
    });

router.route('/:id')
    .get((req, res) => {
        res.json({ message: 'Get single assignment' });
    })
    .put(authorize('admin', 'lecturer'), (req, res) => {
        res.json({ message: 'Update assignment' });
    })
    .delete(authorize('admin', 'lecturer'), (req, res) => {
        res.json({ message: 'Delete assignment' });
    });

module.exports = router; 