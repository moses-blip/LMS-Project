const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');

// Placeholder routes - will be implemented later
router.use(protect);

router.route('/')
    .get((req, res) => {
        res.json({ message: 'Get all materials' });
    })
    .post(authorize('instructor'), (req, res) => {
        res.json({ message: 'Create material' });
    });

router.route('/:id')
    .get((req, res) => {
        res.json({ message: 'Get single material' });
    })
    .put(authorize('instructor'), (req, res) => {
        res.json({ message: 'Update material' });
    })
    .delete(authorize('instructor'), (req, res) => {
        res.json({ message: 'Delete material' });
    });

module.exports = router; 