import express from "express";
const router = express.Router();

// Controllers
import adminController from "../../http/controllers/admin/adminController.js";
import trackController from "../../http/controllers/admin/trackController.js";

// Admin Routes
router.get("/", adminController.index);

// Admin Tracks Routes
router.get("/tracks", trackController.index);
router.get("/tracks/create", trackController.create);
router.post("/tracks", trackController.store);
router.get("/tracks/edit/:id/", trackController.edit);
router.put("/tracks/:id", trackController.update);
router.delete("/tracks/:id", trackController.destroy);
router.post("/tracks/bulk-delete", trackController.bulkDestroy);
router.put("/tracks/bulk-status", trackController.bulkUpdateStatus);

export default router;
