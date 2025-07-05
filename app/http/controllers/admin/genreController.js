import Controller from "../controller.js";
import Genre from "../../../models/genre.js";
import mongoose from "mongoose";

class GenreController extends Controller {
  // GET /admin/genres - List all genres
  async index(req, res) {
    try {
      const { name } = req.query;

      let filter = {};

      // Filter by genre name
      if (name) {
        filter.name = { $regex: name, $options: "i" };
      }

      const genres = await Genre.find(filter).sort({ createdAt: -1 });

      res.json({ success: true, data: genres });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // GET /admin/genres/create - Show create form
  async create(req, res) {
    res.json({ success: true, message: "Create genre form" });
  }

  // POST /admin/genres - Store new genre
  async store(req, res) {
    try {
      const { name, description } = req.body;

      const genre = new Genre({
        name,
        description,
      });

      await genre.save();

      res.status(201).json({ success: true, data: genre });
    } catch (error) {
      if (error.code === 11000) {
        return res.status(400).json({
          success: false,
          message: "Genre with this name already exists",
        });
      }
      res.status(400).json({ success: false, message: error.message });
    }
  }

  // GET /admin/genres/:id - Show genre details
  async show(req, res) {
    try {
      const genre = await Genre.findById(req.params.id);

      if (!genre) {
        return res
          .status(404)
          .json({ success: false, message: "Genre not found" });
      }

      res.json({ success: true, data: genre });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // GET /admin/genres/:id/edit - Show edit form
  async edit(req, res) {
    try {
      const genre = await Genre.findById(req.params.id);

      if (!genre) {
        return res
          .status(404)
          .json({ success: false, message: "Genre not found" });
      }

      res.json({ success: true, data: genre });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // PUT /admin/genres/:id - Update genre
  async update(req, res) {
    try {
      const { name, description } = req.body;

      const genre = await Genre.findByIdAndUpdate(
        req.params.id,
        {
          name,
          description,
        },
        { new: true, runValidators: true }
      );

      if (!genre) {
        return res
          .status(404)
          .json({ success: false, message: "Genre not found" });
      }

      res.json({ success: true, data: genre });
    } catch (error) {
      if (error.code === 11000) {
        return res.status(400).json({
          success: false,
          message: "Genre with this name already exists",
        });
      }
      res.status(400).json({ success: false, message: error.message });
    }
  }

  // DELETE /admin/genres/:id - Delete genre
  async destroy(req, res) {
    try {
      const genre = await Genre.findByIdAndDelete(req.params.id);

      if (!genre) {
        return res
          .status(404)
          .json({ success: false, message: "Genre not found" });
      }

      res.json({ success: true, message: "Genre deleted successfully" });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // POST /admin/genres/bulk-delete - Bulk delete genres
  async bulkDestroy(req, res) {
    try {
      const { genreIds } = req.body;

      if (!genreIds || !Array.isArray(genreIds) || genreIds.length === 0) {
        return res
          .status(400)
          .json({ success: false, message: "Genre IDs array is required" });
      }

      // Validate that all IDs are valid ObjectIds
      const validIds = genreIds.filter((id) =>
        mongoose.Types.ObjectId.isValid(id)
      );

      if (validIds.length !== genreIds.length) {
        return res
          .status(400)
          .json({ success: false, message: "Some genre IDs are invalid" });
      }

      const result = await Genre.deleteMany({ _id: { $in: genreIds } });

      if (result.deletedCount === 0) {
        return res
          .status(404)
          .json({ success: false, message: "No genres found to delete" });
      }

      res.json({
        success: true,
        message: `${result.deletedCount} genre(s) deleted successfully`,
        deletedCount: result.deletedCount,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

export default new GenreController();
