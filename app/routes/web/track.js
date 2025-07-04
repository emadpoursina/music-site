import express from 'express';
import Track from '../../models/track.js';

const router = express.Router();

// GET /track → Get all tracks
router.get('/', async (req, res) => {
  try {
    const tracks = await Track.find()
      .populate('singer')
      .populate('album')
      .populate('genre')
    res.json(tracks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /track/:track_title → Get a single track by title
router.get('/:track_title', async (req, res) => {
  try {
    const trackTitle = req.params.track_title;
    const track = await Track.findOne({ title: trackTitle })
      .populate('singer')
      .populate('album')
      .populate('genre')

    if (!track) return res.status(404).json({ message: 'Track not found' });

    res.json(track);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

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
