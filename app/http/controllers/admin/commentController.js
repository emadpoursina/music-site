import Controller from "../controller.js";
import Comment from "../../../models/comment.js";
import mongoose from "mongoose";

class CommentController extends Controller {
  // GET /admin/comments - List all comments with filters
  async index(req, res) {
    try {
      const { status, commentableType, commentableId, user, parentComment } =
        req.query;

      let filter = {};

      if (status) {
        filter.status = status;
      }

      if (commentableType) {
        filter.commentableType = commentableType;
      }

      if (commentableId) {
        filter.commentableId = commentableId;
      }

      if (user) {
        filter.user = user;
      }

      if (parentComment) {
        filter.parentComment = parentComment;
      }

      const comments = await Comment.find(filter)
        .populate("user", "name email")
        .populate("parentComment", "content")
        .sort({ createdAt: -1 });

      res.json({ success: true, data: comments });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // GET /admin/comments/:id - Show comment details
  async show(req, res) {
    try {
      const comment = await Comment.findById(req.params.id)
        .populate("user", "name email")
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

  // DELETE /admin/comments/:id - Delete comment
  async destroy(req, res) {
    try {
      const comment = await Comment.findByIdAndDelete(req.params.id);

      if (!comment) {
        return res
          .status(404)
          .json({ success: false, message: "Comment not found" });
      }

      res.json({ success: true, message: "Comment deleted successfully" });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // POST /admin/comments/bulk-delete - Bulk delete comments
  async bulkDestroy(req, res) {
    try {
      const { commentIds } = req.body;

      if (
        !commentIds ||
        !Array.isArray(commentIds) ||
        commentIds.length === 0
      ) {
        return res
          .status(400)
          .json({ success: false, message: "Comment IDs array is required" });
      }

      const validIds = commentIds.filter((id) =>
        mongoose.Types.ObjectId.isValid(id)
      );

      if (validIds.length !== commentIds.length) {
        return res
          .status(400)
          .json({ success: false, message: "Some comment IDs are invalid" });
      }

      const result = await Comment.deleteMany({ _id: { $in: commentIds } });

      if (result.deletedCount === 0) {
        return res
          .status(404)
          .json({ success: false, message: "No comments found to delete" });
      }

      res.json({
        success: true,
        message: `${result.deletedCount} comment(s) deleted successfully`,
        deletedCount: result.deletedCount,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // PUT /admin/comments/bulk-status - Bulk update comment status
  async bulkUpdateStatus(req, res) {
    try {
      const { commentIds, status } = req.body;

      if (
        !commentIds ||
        !Array.isArray(commentIds) ||
        commentIds.length === 0
      ) {
        return res
          .status(400)
          .json({ success: false, message: "Comment IDs array is required" });
      }

      if (!status || !["approved", "denied", "pending"].includes(status)) {
        return res.status(400).json({
          success: false,
          message: "Valid status (approved, denied, pending) is required",
        });
      }

      const validIds = commentIds.filter((id) =>
        mongoose.Types.ObjectId.isValid(id)
      );

      if (validIds.length !== commentIds.length) {
        return res
          .status(400)
          .json({ success: false, message: "Some comment IDs are invalid" });
      }

      const result = await Comment.updateMany(
        { _id: { $in: commentIds } },
        { status },
        { runValidators: true }
      );

      if (result.matchedCount === 0) {
        return res
          .status(404)
          .json({ success: false, message: "No comments found to update" });
      }

      res.json({
        success: true,
        message: `${result.modifiedCount} comment(s) status updated to ${status}`,
        modifiedCount: result.modifiedCount,
        status,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // GET /admin/comments/pending - Get pending comments
  async pending(req, res) {
    try {
      const comments = await Comment.find({ status: "pending" })
        .populate("user", "name email")
        .populate("parentComment", "content")
        .sort({ createdAt: -1 });

      res.json({ success: true, data: comments });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // PUT /admin/comments/:id/approve - Approve comment
  async approve(req, res) {
    try {
      const comment = await Comment.findByIdAndUpdate(
        req.params.id,
        { status: "approved" },
        { new: true, runValidators: true }
      );

      if (!comment) {
        return res
          .status(404)
          .json({ success: false, message: "Comment not found" });
      }

      res.json({ success: true, data: comment });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  // PUT /admin/comments/:id/deny - Deny comment
  async deny(req, res) {
    try {
      const comment = await Comment.findByIdAndUpdate(
        req.params.id,
        { status: "denied" },
        { new: true, runValidators: true }
      );

      if (!comment) {
        return res
          .status(404)
          .json({ success: false, message: "Comment not found" });
      }

      res.json({ success: true, data: comment });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
}

export default new CommentController();
