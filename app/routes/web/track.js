import express from 'express';
import Track from '../../models/track.js';

const router = express.Router();

// POST /track → Add a new track
router.post('/', async (req, res) => {
  try {
    const {
      title,
      singer,
      album,
      genre,
      audioUrl,
      coverImageUrl,
    } = req.body;

    const track = new Track({
      title,
      singer,
      album,
      genre,
      audioUrl,
      coverImageUrl,
    });

    await track.save();
    res.status(201).json(track);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
