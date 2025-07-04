import express from 'express';
import Genre from '../../models/genre.js';
import Track from '../../models/track.js';

const router = express.Router();

// GET /genres/ → Get all genres
router.get('/', async (req, res) => {
  try {
    const genres = await Genre.find();
    res.json(genres);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


export default router;