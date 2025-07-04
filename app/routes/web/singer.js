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

router.get('/:singer_name', async (req, res) => {
    try {
        const singer = await Singer.findOne({ name: req.params.singer_name });
        if (!singer) {
            return res.status(404).json({ error: 'Singer not found' });
        }
        res.json(singer);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch singer' });
    }
});

router.post('/', async (req, res) => {
    try {
        const singer = new Singer(req.body);
        
        await singer.save();
        res.status(201).json(singer);
    } catch (err) {
        if (err.code === 11000) {
            // Duplicate key error (name already exists)
            res.status(400).json({ error: 'Failed to add singer', details: "Singer already exists."});
        } else {
            res.status(400).json({ error: 'Failed to add singer', details: err.message });
        }
    }
});

export default router