import express from "express";
import commentController from "../../http/controllers/commentController.js";
import redirectIfNotAuthenticated from "../../http/middlewares/redirectIfNotAuthenticated.js";

const router = express.Router();

// Public routes (no authentication required)
router.get("/", commentController.index);
router.get("/:id", commentController.show);
router.get("/by-content/:type/:id", commentController.getByContent);
router.get("/replies/:commentId", commentController.getReplies);

// Protected routes (authentication required)
router.post("/", redirectIfNotAuthenticated, commentController.store);
router.post("/:id/reply", redirectIfNotAuthenticated, commentController.reply);

export default router;
