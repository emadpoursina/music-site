import Controller from "../controller.js";
import Album from "../../../models/album.js";
import mongoose from "mongoose";

class AlbumController extends Controller {
  // GET /admin/albums - List all albums
  async index(req, res) {
    try {
      const { title, singerName } = req.query;

      let filter = {};

      // Filter by album title
      if (title) {
        filter.title = { $regex: title, $options: "i" };
      }

      let albums = await Album.find(filter)
        .populate("singer", "name")
        .populate("genre", "name")
        .sort({ createdAt: -1 });

      // Filter by populated fields after population
      if (singerName) {
        albums = albums.filter(
          (album) =>
            album.singer &&
            album.singer.name &&
            album.singer.name.toLowerCase().includes(singerName.toLowerCase())
        );
      }

      res.json({ success: true, data: albums });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // GET /admin/albums/create - Show create form
  async create(req, res) {
    res.json({ success: true, message: "Create album form" });
  }

  // POST /admin/albums - Store new album
  async store(req, res) {
    try {
      const {
        title,
        description,
        releaseDate,
        coverImageUrl,
        singer,
        genre,
        tracks,
      } = req.body;

      const album = new Album({
        title,
        description,
        releaseDate,
        coverImageUrl,
        singer,
        genre,
        tracks: tracks || [],
      });

      await album.save();

      res.status(201).json({ success: true, data: album });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  // GET /admin/albums/:id - Show album details
  async show(req, res) {
    try {
      const album = await Album.findById(req.params.id)
        .populate("singer", "name")
        .populate("genre", "name")
        .populate("tracks", "title");

      if (!album) {
        return res
          .status(404)
          .json({ success: false, message: "Album not found" });
      }

      res.json({ success: true, data: album });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // GET /admin/albums/:id/edit - Show edit form
  async edit(req, res) {
    try {
      const album = await Album.findById(req.params.id);

      if (!album) {
        return res
          .status(404)
          .json({ success: false, message: "Album not found" });
      }

      res.json({ success: true, data: album });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // PUT /admin/albums/:id - Update album
  async update(req, res) {
    try {
      const {
        title,
        description,
        releaseDate,
        coverImageUrl,
        singer,
        genre,
        tracks,
      } = req.body;

      const album = await Album.findByIdAndUpdate(
        req.params.id,
        {
          title,
          description,
          releaseDate,
          coverImageUrl,
          singer,
          genre,
          tracks: tracks || [],
        },
        { new: true, runValidators: true }
      );

      if (!album) {
        return res
          .status(404)
          .json({ success: false, message: "Album not found" });
      }

      res.json({ success: true, data: album });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  // DELETE /admin/albums/:id - Delete album
  async destroy(req, res) {
    try {
      const album = await Album.findByIdAndDelete(req.params.id);

      if (!album) {
        return res
          .status(404)
          .json({ success: false, message: "Album not found" });
      }

      res.json({ success: true, message: "Album deleted successfully" });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // POST /admin/albums/bulk-delete - Bulk delete albums
  async bulkDestroy(req, res) {
    try {
      const { albumIds } = req.body;

      if (!albumIds || !Array.isArray(albumIds) || albumIds.length === 0) {
        return res
          .status(400)
          .json({ success: false, message: "Album IDs array is required" });
      }

      // Validate that all IDs are valid ObjectIds
      const validIds = albumIds.filter((id) =>
        mongoose.Types.ObjectId.isValid(id)
      );

      if (validIds.length !== albumIds.length) {
        return res
          .status(400)
          .json({ success: false, message: "Some album IDs are invalid" });
      }

      const result = await Album.deleteMany({ _id: { $in: albumIds } });

      if (result.deletedCount === 0) {
        return res
          .status(404)
          .json({ success: false, message: "No albums found to delete" });
      }

      res.json({
        success: true,
        message: `${result.deletedCount} album(s) deleted successfully`,
        deletedCount: result.deletedCount,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

export default new AlbumController();
