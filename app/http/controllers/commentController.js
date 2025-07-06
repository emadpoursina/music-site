import Controller from "../controllers/controller.js";
import Comment from "../../models/comment.js";

class CommentController extends Controller {
  // GET /comments - Get approved comments with filters
  async index(req, res) {
    try {
      const { commentableType, commentableId, parentComment } = req.query;

      let filter = { status: "approved" }; // Only show approved comments

      if (commentableType) {
        filter.commentableType = commentableType;
      }

      if (commentableId) {
        filter.commentableId = commentableId;
      }

      if (parentComment) {
        filter.parentComment = parentComment;
      }

      const comments = await Comment.find(filter)
        .populate("user", "name")
        .populate("parentComment", "content")
        .sort({ createdAt: -1 });

      res.json({ success: true, data: comments });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // POST /comments - Create new comment (requires authentication)
  async store(req, res) {
    try {
      const { content, commentableType, commentableId, parentComment } =
        req.body;

      // Get user from authenticated session (you'll need to implement this)
      const userId = req.user ? req.user.id : null;

      if (!userId) {
        return res.status(401).json({
          success: false,
          message: "Authentication required",
        });
      }

      if (!content || !commentableType || !commentableId) {
        return res.status(400).json({
          success: false,
          message: "Content, commentableType, and commentableId are required",
        });
      }

      // Validate commentableType
      if (!["track", "album", "series", "movie"].includes(commentableType)) {
        return res.status(400).json({
          success: false,
          message: "Invalid commentableType",
        });
      }

      const comment = new Comment({
        content,
        user: userId,
        commentableType,
        commentableId,
        parentComment,
        status: "pending", // New comments start as pending
      });

      await comment.save();

      res.status(201).json({ success: true, data: comment });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  // GET /comments/:id - Show specific comment (only if approved)
  async show(req, res) {
    try {
      const comment = await Comment.findOne({
        _id: req.params.id,
        status: "approved",
      })
        .populate("user", "name")
        .populate("parentComment", "content");

      if (!comment) {
        return res
          .status(404)
          .json({ success: false, message: "Comment not found" });
      }

      res.json({ success: true, data: comment });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // GET /comments/by-content/:type/:id - Get comments for specific content
  async getByContent(req, res) {
    try {
      const { type, id } = req.params;

      if (!["track", "album", "series", "movie"].includes(type)) {
        return res.status(400).json({
          success: false,
          message: "Invalid content type",
        });
      }

      const comments = await Comment.find({
        commentableType: type,
        commentableId: id,
        status: "approved",
      })
        .populate("user", "name")
        .populate("parentComment", "content")
        .sort({ createdAt: -1 });

      res.json({ success: true, data: comments });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // GET /comments/replies/:commentId - Get replies to a specific comment
  async getReplies(req, res) {
    try {
      const comments = await Comment.find({
        parentComment: req.params.commentId,
        status: "approved",
      })
        .populate("user", "name")
        .sort({ createdAt: -1 });

      res.json({ success: true, data: comments });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // POST /comments/:id/reply - Reply to a comment
  async reply(req, res) {
    try {
      const { content } = req.body;

      // Get user from authenticated session
      const userId = req.user ? req.user.id : null;

      if (!userId) {
        return res.status(401).json({
          success: false,
          message: "Authentication required",
        });
      }

      if (!content) {
        return res.status(400).json({
          success: false,
          message: "Content is required",
        });
      }

      // Get the parent comment to inherit its content type and ID
      const parentComment = await Comment.findById(req.params.id);
      if (!parentComment) {
        return res.status(404).json({
          success: false,
          message: "Parent comment not found",
        });
      }

      const reply = new Comment({
        content,
        user: userId,
        commentableType: parentComment.commentableType,
        commentableId: parentComment.commentableId,
        parentComment: req.params.id,
        status: "pending",
      });

      await reply.save();

      res.status(201).json({ success: true, data: reply });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
}

export default new CommentController();
