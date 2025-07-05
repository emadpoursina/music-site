import Controller from "../controller.js";
import Series from "../../../models/series.js";
import mongoose from "mongoose";

class SeriesController extends Controller {
  // GET /admin/series - List all series (filter by name)
  async index(req, res) {
    try {
      const { name } = req.query;
      let filter = {};
      if (name) {
        filter.$or = [
          { persianName: { $regex: name, $options: "i" } },
          { englishName: { $regex: name, $options: "i" } },
        ];
      }
      const series = await Series.find(filter)
        .populate("director", "persianName englishName")
        .populate("star", "persianName englishName")
        .populate("players", "persianName englishName")
        .populate("genres", "name")
        .sort({ createdAt: -1 });
      res.json({ success: true, data: series });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // GET /admin/series/create - Show create form
  async create(req, res) {
    res.json({ success: true, message: "Create series form" });
  }

  // POST /admin/series - Store new series
  async store(req, res) {
    try {
      const series = new Series(req.body);
      await series.save();
      res.status(201).json({ success: true, data: series });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  // GET /admin/series/:id - Show series details
  async show(req, res) {
    try {
      const series = await Series.findById(req.params.id)
        .populate("director", "persianName englishName")
        .populate("star", "persianName englishName")
        .populate("players", "persianName englishName")
        .populate("genres", "name");
      if (!series) {
        return res
          .status(404)
          .json({ success: false, message: "Series not found" });
      }
      res.json({ success: true, data: series });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // GET /admin/series/edit/:id - Show edit form
  async edit(req, res) {
    try {
      const series = await Series.findById(req.params.id);
      if (!series) {
        return res
          .status(404)
          .json({ success: false, message: "Series not found" });
      }
      res.json({ success: true, data: series });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // PUT /admin/series/:id - Update series
  async update(req, res) {
    try {
      const series = await Series.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!series) {
        return res
          .status(404)
          .json({ success: false, message: "Series not found" });
      }
      res.json({ success: true, data: series });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  // DELETE /admin/series/:id - Delete series
  async destroy(req, res) {
    try {
      const series = await Series.findByIdAndDelete(req.params.id);
      if (!series) {
        return res
          .status(404)
          .json({ success: false, message: "Series not found" });
      }
      res.json({ success: true, message: "Series deleted successfully" });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // POST /admin/series/bulk-delete - Bulk delete series
  async bulkDestroy(req, res) {
    try {
      const { seriesIds } = req.body;
      if (!seriesIds || !Array.isArray(seriesIds) || seriesIds.length === 0) {
        return res
          .status(400)
          .json({ success: false, message: "Series IDs array is required" });
      }
      const validIds = seriesIds.filter((id) =>
        mongoose.Types.ObjectId.isValid(id)
      );
      if (validIds.length !== seriesIds.length) {
        return res
          .status(400)
          .json({ success: false, message: "Some series IDs are invalid" });
      }
      const result = await Series.deleteMany({ _id: { $in: seriesIds } });
      if (result.deletedCount === 0) {
        return res
          .status(404)
          .json({ success: false, message: "No series found to delete" });
      }
      res.json({
        success: true,
        message: `${result.deletedCount} series deleted successfully`,
        deletedCount: result.deletedCount,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

export default new SeriesController();
