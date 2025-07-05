import Controller from "../controller.js";
import PlaylistCategory from "../../../models/playlistCategory.js";
import mongoose from "mongoose";

class PlaylistCategoryController extends Controller {
  // GET /admin/playlist-categories - List all playlist categories
  async index(req, res) {
    try {
      const { name, slug } = req.query;
      let filter = {};

      // Filter by category name
      if (name) {
        filter.name = { $regex: name, $options: "i" };
      }

      // Filter by slug
      if (slug) {
        filter.slug = { $regex: slug, $options: "i" };
      }

      const categories = await PlaylistCategory.find(filter).sort({
        createdAt: -1,
      });

      res.json({ success: true, data: categories });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // GET /admin/playlist-categories/create - Show create form
  async create(req, res) {
    res.json({ success: true, message: "Create playlist category form" });
  }

  // POST /admin/playlist-categories - Store new playlist category
  async store(req, res) {
    try {
      const { name, slug } = req.body;

      const category = new PlaylistCategory({
        name,
        slug,
      });

      await category.save();

      res.status(201).json({ success: true, data: category });
    } catch (error) {
      if (error.code === 11000) {
        return res.status(400).json({
          success: false,
          message: "Playlist category with this name or slug already exists",
        });
      }
      res.status(400).json({ success: false, message: error.message });
    }
  }

  // GET /admin/playlist-categories/:id - Show category details
  async show(req, res) {
    try {
      const category = await PlaylistCategory.findById(req.params.id);

      if (!category) {
        return res
          .status(404)
          .json({ success: false, message: "Playlist category not found" });
      }

      res.json({ success: true, data: category });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // GET /admin/playlist-categories/:id/edit - Show edit form
  async edit(req, res) {
    try {
      const category = await PlaylistCategory.findById(req.params.id);

      if (!category) {
        return res
          .status(404)
          .json({ success: false, message: "Playlist category not found" });
      }

      res.json({ success: true, data: category });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // PUT /admin/playlist-categories/:id - Update category
  async update(req, res) {
    try {
      const { name, slug } = req.body;

      const category = await PlaylistCategory.findByIdAndUpdate(
        req.params.id,
        {
          name,
          slug,
        },
        { new: true, runValidators: true }
      );

      if (!category) {
        return res
          .status(404)
          .json({ success: false, message: "Playlist category not found" });
      }

      res.json({ success: true, data: category });
    } catch (error) {
      if (error.code === 11000) {
        return res.status(400).json({
          success: false,
          message: "Playlist category with this name or slug already exists",
        });
      }
      res.status(400).json({ success: false, message: error.message });
    }
  }

  // DELETE /admin/playlist-categories/:id - Delete category
  async destroy(req, res) {
    try {
      const category = await PlaylistCategory.findByIdAndDelete(req.params.id);

      if (!category) {
        return res
          .status(404)
          .json({ success: false, message: "Playlist category not found" });
      }

      res.json({
        success: true,
        message: "Playlist category deleted successfully",
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // POST /admin/playlist-categories/bulk-delete - Bulk delete categories
  async bulkDestroy(req, res) {
    try {
      const { categoryIds } = req.body;

      if (
        !categoryIds ||
        !Array.isArray(categoryIds) ||
        categoryIds.length === 0
      ) {
        return res
          .status(400)
          .json({ success: false, message: "Category IDs array is required" });
      }

      // Validate that all IDs are valid ObjectIds
      const validIds = categoryIds.filter((id) =>
        mongoose.Types.ObjectId.isValid(id)
      );

      if (validIds.length !== categoryIds.length) {
        return res
          .status(400)
          .json({ success: false, message: "Some category IDs are invalid" });
      }

      const result = await PlaylistCategory.deleteMany({
        _id: { $in: categoryIds },
      });

      if (result.deletedCount === 0) {
        return res
          .status(404)
          .json({ success: false, message: "No categories found to delete" });
      }

      res.json({
        success: true,
        message: `${result.deletedCount} category(ies) deleted successfully`,
        deletedCount: result.deletedCount,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

export default new PlaylistCategoryController();
