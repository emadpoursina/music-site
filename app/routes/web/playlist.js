import express from "express";
import Playlist from "../../models/playlist.js";
import PlaylistCategory from "../../models/playlistCategory.js";

const router = express.Router();

// GET /playlists - List all playlists (with optional filters)
router.get("/", async (req, res) => {
  try {
    const { category, status, isSpecial } = req.query;
    let filter = {};
    if (category) filter.category = category;
    if (status) filter.status = status;
    if (isSpecial !== undefined) filter.isSpecial = isSpecial === "true";
    const playlists = await Playlist.find(filter)
      .populate("category", "name")
      .populate("tracks", "title")
      .sort({ createdAt: -1 });
    res.json({ success: true, data: playlists });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// GET /playlists/:slug - Show a playlist by slug
router.get("/:slug", async (req, res) => {
  try {
    const playlist = await Playlist.findOne({ slug: req.params.slug })
      .populate("category", "name")
      .populate("tracks", "title");
    if (!playlist) {
      return res
        .status(404)
        .json({ success: false, message: "Playlist not found" });
    }
    res.json({ success: true, data: playlist });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
