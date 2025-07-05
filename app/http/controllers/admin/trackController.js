import Controller from "../controller.js";
import Track from "../../models/track.js";

class TrackController extends Controller {
  // GET /admin/tracks - List all tracks
  async index(req, res) {
    try {
      const { situation, artistName, name, category } = req.query;

      // Build filter object for direct fields
      let filter = {};

      // Filter by situation (publish status)
      if (situation) {
        filter.situation = situation;
      }

      // Filter by track name
      if (name) {
        filter.title = { $regex: name, $options: "i" };
      }

      let tracks = await Track.find(filter)
        .populate("singer", "name")
        .populate("album", "title")
        .populate("genre", "name")
        .sort({ createdAt: -1 });

      // Filter by populated fields after population
      if (artistName) {
        tracks = tracks.filter(
          (track) =>
            track.singer &&
            track.singer.name &&
            track.singer.name.toLowerCase().includes(artistName.toLowerCase())
        );
      }

      if (category) {
        tracks = tracks.filter(
          (track) =>
            track.genre &&
            track.genre.name &&
            track.genre.name.toLowerCase().includes(category.toLowerCase())
        );
      }

      res.json({ success: true, data: tracks });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // GET /admin/tracks/create - Show create form
  async create(req, res) {
    res.json({ success: true, message: "Create track form" });
  }

  // POST /admin/tracks - Store new track
  async store(req, res) {
    try {
      const { title, singer, album, genre, audioUrl, coverImageUrl } = req.body;

      const track = new Track({
        title,
        singer,
        album,
        genre,
        audioUrl,
        coverImageUrl,
      });

      await track.save();

      res.status(201).json({ success: true, data: track });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  // GET /admin/tracks/:id - Show track details
  async show(req, res) {
    try {
      const track = await Track.findById(req.params.id)
        .populate("singer", "name")
        .populate("album", "title")
        .populate("genre", "name");

      if (!track) {
        return res
          .status(404)
          .json({ success: false, message: "Track not found" });
      }

      res.json({ success: true, data: track });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // GET /admin/tracks/:id/edit - Show edit form
  async edit(req, res) {
    try {
      const track = await Track.findById(req.params.id);

      if (!track) {
        return res
          .status(404)
          .json({ success: false, message: "Track not found" });
      }

      res.json({ success: true, data: track });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // PUT /admin/tracks/:id - Update track
  async update(req, res) {
    try {
      const { title, singer, album, genre, audioUrl, coverImageUrl } = req.body;

      const track = await Track.findByIdAndUpdate(
        req.params.id,
        {
          title,
          singer,
          album,
          genre,
          audioUrl,
          coverImageUrl,
        },
        { new: true, runValidators: true }
      );

      if (!track) {
        return res
          .status(404)
          .json({ success: false, message: "Track not found" });
      }

      res.json({ success: true, data: track });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  // DELETE /admin/tracks/:id - Delete track
  async destroy(req, res) {
    try {
      const track = await Track.findByIdAndDelete(req.params.id);

      if (!track) {
        return res
          .status(404)
          .json({ success: false, message: "Track not found" });
      }

      res.json({ success: true, message: "Track deleted successfully" });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

export default new TrackController();
