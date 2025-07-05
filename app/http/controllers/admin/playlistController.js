import Controller from "../controller.js";
import Playlist from "../../../models/playlist.js";
import mongoose from "mongoose";

class PlaylistController extends Controller {
  // GET /admin/playlists - List all playlists
  async index(req, res) {
    try {
      const playlists = await Playlist.find()
        .populate("category", "name")
        .populate("tracks", "title")
        .sort({ createdAt: -1 });
      res.json({ success: true, data: playlists });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // GET /admin/playlists/create - Show create form
  async create(req, res) {
    res.json({ success: true, message: "Create playlist form" });
  }

  // POST /admin/playlists - Store new playlist
  async store(req, res) {
    try {
      const {
        category,
        status,
        isSpecial,
        name,
        englishName,
        avatarImage,
        tracks,
        description,
        slug,
      } = req.body;
      const playlist = new Playlist({
        category,
        status,
        isSpecial,
        name,
        englishName,
        avatarImage,
        tracks,
        description,
        slug,
      });
      await playlist.save();
      res.status(201).json({ success: true, data: playlist });
    } catch (error) {
      if (error.code === 11000) {
        return res.status(400).json({
          success: false,
          message: "Playlist with this slug already exists",
        });
      }
      res.status(400).json({ success: false, message: error.message });
    }
  }

  // GET /admin/playlists/:id - Show playlist details
  async show(req, res) {
    try {
      const playlist = await Playlist.findById(req.params.id)
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
  }

  // GET /admin/playlists/edit/:id - Show edit form
  async edit(req, res) {
    try {
      const playlist = await Playlist.findById(req.params.id);
      if (!playlist) {
        return res
          .status(404)
          .json({ success: false, message: "Playlist not found" });
      }
      res.json({ success: true, data: playlist });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // PUT /admin/playlists/:id - Update playlist
  async update(req, res) {
    try {
      const {
        category,
        status,
        isSpecial,
        name,
        englishName,
        avatarImage,
        tracks,
        description,
        slug,
      } = req.body;
      const playlist = await Playlist.findByIdAndUpdate(
        req.params.id,
        {
          category,
          status,
          isSpecial,
          name,
          englishName,
          avatarImage,
          tracks,
          description,
          slug,
        },
        { new: true, runValidators: true }
      );
      if (!playlist) {
        return res
          .status(404)
          .json({ success: false, message: "Playlist not found" });
      }
      res.json({ success: true, data: playlist });
    } catch (error) {
      if (error.code === 11000) {
        return res.status(400).json({
          success: false,
          message: "Playlist with this slug already exists",
        });
      }
      res.status(400).json({ success: false, message: error.message });
    }
  }

  // DELETE /admin/playlists/:id - Delete playlist
  async destroy(req, res) {
    try {
      const playlist = await Playlist.findByIdAndDelete(req.params.id);
      if (!playlist) {
        return res
          .status(404)
          .json({ success: false, message: "Playlist not found" });
      }
      res.json({ success: true, message: "Playlist deleted successfully" });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // POST /admin/playlists/bulk-delete - Bulk delete playlists
  async bulkDestroy(req, res) {
    try {
      const { playlistIds } = req.body;
      if (
        !playlistIds ||
        !Array.isArray(playlistIds) ||
        playlistIds.length === 0
      ) {
        return res
          .status(400)
          .json({ success: false, message: "Playlist IDs array is required" });
      }
      const validIds = playlistIds.filter((id) =>
        mongoose.Types.ObjectId.isValid(id)
      );
      if (validIds.length !== playlistIds.length) {
        return res
          .status(400)
          .json({ success: false, message: "Some playlist IDs are invalid" });
      }
      const result = await Playlist.deleteMany({ _id: { $in: playlistIds } });
      if (result.deletedCount === 0) {
        return res
          .status(404)
          .json({ success: false, message: "No playlists found to delete" });
      }
      res.json({
        success: true,
        message: `${result.deletedCount} playlist(s) deleted successfully`,
        deletedCount: result.deletedCount,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

export default new PlaylistController();
