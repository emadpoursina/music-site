import express from 'express';
import Track from '../../models/track.js';
import Album from '../../models/album.js';
import Singer from '../../models/singer.js';
import Genre from '../../models/genre.js';

const router = express.Router();

// Home Route
router.get('/', (req, res) => {
  res.send("home");
});

// Search Route: /search?q=something
router.get('/search', async (req, res) => {
  const q = req.query.q;

  if (!q) {
    return res.status(400).json({ message: "Query parameter 'q' is required" });
  }

  try {
    const regex = new RegExp(q, 'i'); // case-insensitive match

    const [tracks, albums, singers, genres] = await Promise.all([
      Track.find({ title: regex }),
      Album.find({ title: regex }),
      Singer.find({ name: regex }),
      Genre.find({ name: regex }),
    ]);

    res.json({ tracks, albums, singers, genres });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
