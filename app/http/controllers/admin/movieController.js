import Controller from "../controller.js";
import Movie from "../../../models/movie.js";
import mongoose from "mongoose";

class MovieController extends Controller {
  // GET /admin/movies - List all movies (filter by name)
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
      const movies = await Movie.find(filter)
        .populate("director", "persianName englishName")
        .populate("star", "persianName englishName")
        .populate("players", "persianName englishName")
        .populate("genres", "name")
        .sort({ createdAt: -1 });
      res.json({ success: true, data: movies });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // GET /admin/movies/create - Show create form
  async create(req, res) {
    res.json({ success: true, message: "Create movie form" });
  }

  // POST /admin/movies - Store new movie
  async store(req, res) {
    try {
      const movie = new Movie(req.body);
      await movie.save();
      res.status(201).json({ success: true, data: movie });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  // GET /admin/movies/:id - Show movie details
  async show(req, res) {
    try {
      const movie = await Movie.findById(req.params.id)
        .populate("director", "persianName englishName")
        .populate("star", "persianName englishName")
        .populate("players", "persianName englishName")
        .populate("genres", "name");
      if (!movie) {
        return res
          .status(404)
          .json({ success: false, message: "Movie not found" });
      }
      res.json({ success: true, data: movie });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // GET /admin/movies/edit/:id - Show edit form
  async edit(req, res) {
    try {
      const movie = await Movie.findById(req.params.id);
      if (!movie) {
        return res
          .status(404)
          .json({ success: false, message: "Movie not found" });
      }
      res.json({ success: true, data: movie });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // PUT /admin/movies/:id - Update movie
  async update(req, res) {
    try {
      const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!movie) {
        return res
          .status(404)
          .json({ success: false, message: "Movie not found" });
      }
      res.json({ success: true, data: movie });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  // DELETE /admin/movies/:id - Delete movie
  async destroy(req, res) {
    try {
      const movie = await Movie.findByIdAndDelete(req.params.id);
      if (!movie) {
        return res
          .status(404)
          .json({ success: false, message: "Movie not found" });
      }
      res.json({ success: true, message: "Movie deleted successfully" });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // POST /admin/movies/bulk-delete - Bulk delete movies
  async bulkDestroy(req, res) {
    try {
      const { movieIds } = req.body;
      if (!movieIds || !Array.isArray(movieIds) || movieIds.length === 0) {
        return res
          .status(400)
          .json({ success: false, message: "Movie IDs array is required" });
      }
      const validIds = movieIds.filter((id) =>
        mongoose.Types.ObjectId.isValid(id)
      );
      if (validIds.length !== movieIds.length) {
        return res
          .status(400)
          .json({ success: false, message: "Some movie IDs are invalid" });
      }
      const result = await Movie.deleteMany({ _id: { $in: movieIds } });
      if (result.deletedCount === 0) {
        return res
          .status(404)
          .json({ success: false, message: "No movies found to delete" });
      }
      res.json({
        success: true,
        message: `${result.deletedCount} movie(s) deleted successfully`,
        deletedCount: result.deletedCount,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

export default new MovieController();
