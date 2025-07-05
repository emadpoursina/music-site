import express from "express";
const router = express.Router();

// Controllers
import adminController from "../../http/controllers/admin/adminController.js";
import trackController from "../../http/controllers/admin/trackController.js";
import singerController from "../../http/controllers/admin/singerController.js";

// Admin Routes
router.get("/", adminController.index);

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

// Admin Singers Routes
router.get("/singers", singerController.index);
router.get("/singers/create", singerController.create);
router.post("/singers", singerController.store);
router.get("/singers/:id", singerController.show);
router.get("/singers/edit/:id/", singerController.edit);
router.put("/singers/:id", singerController.update);
router.delete("/singers/:id", singerController.destroy);
router.post("/singers/bulk-delete", singerController.bulkDestroy);

export default router;
export default router;
