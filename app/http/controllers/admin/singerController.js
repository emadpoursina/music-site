import Controller from "../controller.js";
import Singer from "../../../models/singer.js";
import mongoose from "mongoose";

class SingerController extends Controller {
  // GET /admin/singers - List all singers
  async index(req, res) {
    try {
      const { name } = req.query;

      let filter = {};

      // Filter by singer name
      if (name) {
        filter.name = { $regex: name, $options: "i" };
      }

      const singers = await Singer.find(filter).sort({ createdAt: -1 });

      res.json({ success: true, data: singers });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // GET /admin/singers/create - Show create form
  async create(req, res) {
    res.json({ success: true, message: "Create singer form" });
  }

  // POST /admin/singers - Store new singer
  async store(req, res) {
    try {
      const { name, bio, avatarUrl, socialLinks } = req.body;

      const singer = new Singer({
        name,
        bio,
        avatarUrl,
        socialLinks,
      });

      await singer.save();

      res.status(201).json({ success: true, data: singer });
    } catch (error) {
      if (error.code === 11000) {
        return res.status(400).json({
          success: false,
          message: "Singer with this name already exists",
        });
      }
      res.status(400).json({ success: false, message: error.message });
    }
  }

  // GET /admin/singers/:id - Show singer details
  async show(req, res) {
    try {
      const singer = await Singer.findById(req.params.id);

      if (!singer) {
        return res
          .status(404)
          .json({ success: false, message: "Singer not found" });
      }

      res.json({ success: true, data: singer });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // GET /admin/singers/:id/edit - Show edit form
  async edit(req, res) {
    try {
      const singer = await Singer.findById(req.params.id);

      if (!singer) {
        return res
          .status(404)
          .json({ success: false, message: "Singer not found" });
      }

      res.json({ success: true, data: singer });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // PUT /admin/singers/:id - Update singer
  async update(req, res) {
    try {
      const { name, bio, avatarUrl, socialLinks } = req.body;

      const singer = await Singer.findByIdAndUpdate(
        req.params.id,
        {
          name,
          bio,
          avatarUrl,
          socialLinks,
        },
        { new: true, runValidators: true }
      );

      if (!singer) {
        return res
          .status(404)
          .json({ success: false, message: "Singer not found" });
      }

      res.json({ success: true, data: singer });
    } catch (error) {
      if (error.code === 11000) {
        return res.status(400).json({
          success: false,
          message: "Singer with this name already exists",
        });
      }
      res.status(400).json({ success: false, message: error.message });
    }
  }

  // DELETE /admin/singers/:id - Delete singer
  async destroy(req, res) {
    try {
      const singer = await Singer.findByIdAndDelete(req.params.id);

      if (!singer) {
        return res
          .status(404)
          .json({ success: false, message: "Singer not found" });
      }

      res.json({ success: true, message: "Singer deleted successfully" });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // POST /admin/singers/bulk-delete - Bulk delete singers
  async bulkDestroy(req, res) {
    try {
      const { singerIds } = req.body;

      if (!singerIds || !Array.isArray(singerIds) || singerIds.length === 0) {
        return res
          .status(400)
          .json({ success: false, message: "Singer IDs array is required" });
      }

      // Validate that all IDs are valid ObjectIds
      const validIds = singerIds.filter((id) =>
        mongoose.Types.ObjectId.isValid(id)
      );

      if (validIds.length !== singerIds.length) {
        return res
          .status(400)
          .json({ success: false, message: "Some singer IDs are invalid" });
      }

      const result = await Singer.deleteMany({ _id: { $in: singerIds } });

      if (result.deletedCount === 0) {
        return res
          .status(404)
          .json({ success: false, message: "No singers found to delete" });
      }

      res.json({
        success: true,
        message: `${result.deletedCount} singer(s) deleted successfully`,
        deletedCount: result.deletedCount,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

export default new SingerController();
