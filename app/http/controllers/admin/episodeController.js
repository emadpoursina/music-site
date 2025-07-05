import Controller from "../controller.js";
import Episode from "../../../models/episode.js";
import mongoose from "mongoose";

class EpisodeController extends Controller {
  // GET /admin/episodes - List all episodes (filter by series)
  async index(req, res) {
    try {
      const { series } = req.query;
      let filter = {};
      if (series) {
        filter.series = series;
      }
      const episodes = await Episode.find(filter)
        .populate("series", "persianName englishName")
        .sort({ createdAt: -1 });
      res.json({ success: true, data: episodes });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // GET /admin/episodes/create - Show create form
  async create(req, res) {
    res.json({ success: true, message: "Create episode form" });
  }

  // POST /admin/episodes - Store new episode
  async store(req, res) {
    try {
      const episode = new Episode(req.body);
      await episode.save();
      res.status(201).json({ success: true, data: episode });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  // GET /admin/episodes/:id - Show episode details
  async show(req, res) {
    try {
      const episode = await Episode.findById(req.params.id).populate(
        "series",
        "persianName englishName"
      );
      if (!episode) {
        return res
          .status(404)
          .json({ success: false, message: "Episode not found" });
      }
      res.json({ success: true, data: episode });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // GET /admin/episodes/edit/:id - Show edit form
  async edit(req, res) {
    try {
      const episode = await Episode.findById(req.params.id);
      if (!episode) {
        return res
          .status(404)
          .json({ success: false, message: "Episode not found" });
      }
      res.json({ success: true, data: episode });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // PUT /admin/episodes/:id - Update episode
  async update(req, res) {
    try {
      const episode = await Episode.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!episode) {
        return res
          .status(404)
          .json({ success: false, message: "Episode not found" });
      }
      res.json({ success: true, data: episode });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  // DELETE /admin/episodes/:id - Delete episode
  async destroy(req, res) {
    try {
      const episode = await Episode.findByIdAndDelete(req.params.id);
      if (!episode) {
        return res
          .status(404)
          .json({ success: false, message: "Episode not found" });
      }
      res.json({ success: true, message: "Episode deleted successfully" });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // POST /admin/episodes/bulk-delete - Bulk delete episodes
  async bulkDestroy(req, res) {
    try {
      const { episodeIds } = req.body;
      if (
        !episodeIds ||
        !Array.isArray(episodeIds) ||
        episodeIds.length === 0
      ) {
        return res
          .status(400)
          .json({ success: false, message: "Episode IDs array is required" });
      }
      const validIds = episodeIds.filter((id) =>
        mongoose.Types.ObjectId.isValid(id)
      );
      if (validIds.length !== episodeIds.length) {
        return res
          .status(400)
          .json({ success: false, message: "Some episode IDs are invalid" });
      }
      const result = await Episode.deleteMany({ _id: { $in: episodeIds } });
      if (result.deletedCount === 0) {
        return res
          .status(404)
          .json({ success: false, message: "No episodes found to delete" });
      }
      res.json({
        success: true,
        message: `${result.deletedCount} episode(s) deleted successfully`,
        deletedCount: result.deletedCount,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

export default new EpisodeController();
