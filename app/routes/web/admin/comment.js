import express from "express";
import commentController from "../../../http/controllers/admin/commentController.js";
import redirectIfNotAdmin from "../../../http/middlewares/redirectIfNotAdmin.js";

const router = express.Router();

// Apply admin middleware to all routes
router.use(redirectIfNotAdmin);

// CRUD routes
router.get("/", commentController.index);
router.post("/", commentController.store);
router.get("/:id", commentController.show);
router.get("/edit/:id", commentController.edit);
router.put("/:id", commentController.update);
router.delete("/:id", commentController.destroy);

// Bulk operations
router.post("/bulk-delete", commentController.bulkDestroy);
router.put("/bulk-status", commentController.bulkUpdateStatus);

// Status management
router.get("/pending", commentController.pending);
router.put("/:id/approve", commentController.approve);
router.put("/:id/deny", commentController.deny);

export default router;
