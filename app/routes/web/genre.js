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

// GET /genres/:genre_name → Get all tracks in a genre
router.get('/:genre_name', async (req, res) => {
  const genreName = req.params.genre_name;

  try {
    // Find the genre first (optional if track has genre name directly)
    const genre = await Genre.findOne({ name: genreName });
    if (!genre) return res.status(404).json({ message: 'Genre not found' });

    // Find tracks that belong to this genre
    const tracks = await Track.find({ genre: genre._id });
    res.json(tracks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /genres → Add a new genre
router.post('/', async (req, res) => {
  const { name, description } = req.body;

  try {
    const genre = new Genre({ name, description });
    await genre.save();
    res.status(201).json(genre);
  } catch (err) {
    if (err.code === 11000) {
      // Duplicate key error (name already exists)
      res.status(400).json({ message: 'Genre already exists' });
    } else {
      res.status(500).json({ message: err.message });
    }
  }
});

export default router;