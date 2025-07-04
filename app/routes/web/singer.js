import express from 'express'
import Singer from '../../models/singer.js'

const router = express.Router();

// Home Routes
router.get('/' , async (req, res) => {
    try {
        const singers = await Singer.find();
        res.json(singers);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch singers' });
    }
});

export default router