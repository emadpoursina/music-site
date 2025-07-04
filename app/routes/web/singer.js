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

router.post('/', async (req, res) => {
    try {
        const singer = new Singer(req.body);
        
        await singer.save();
        res.status(201).json(singer);
    } catch (err) {
        res.status(400).json({ error: 'Failed to add singer', details: err.message });
    }
});

export default router