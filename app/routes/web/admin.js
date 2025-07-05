import express from "express";
const router = express.Router();

// Controllers
import adminController from "../../http/controllers/admin/adminController.js";
import trackController from "../../http/controllers/admin/trackController.js";
import singerController from "../../http/controllers/admin/singerController.js";
import albumController from "../../http/controllers/admin/albumController.js";
import genreController from "../../http/controllers/admin/genreController.js";
import userController from "../../http/controllers/admin/userController.js";

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

// Admin Albums Routes
router.get("/albums", albumController.index);
router.get("/albums/create", albumController.create);
router.post("/albums", albumController.store);
router.get("/albums/:id", albumController.show);
router.get("/albums/edit/:id/", albumController.edit);
router.put("/albums/:id", albumController.update);
router.delete("/albums/:id", albumController.destroy);
router.post("/albums/bulk-delete", albumController.bulkDestroy);

// Admin Genres Routes
router.get("/genres", genreController.index);
router.get("/genres/create", genreController.create);
router.post("/genres", genreController.store);
router.get("/genres/:id", genreController.show);
router.get("/genres/edit/:id/", genreController.edit);
router.put("/genres/:id", genreController.update);
router.delete("/genres/:id", genreController.destroy);
router.post("/genres/bulk-delete", genreController.bulkDestroy);

// Admin Users Routes
router.get("/users", userController.index);
router.get("/users/create", userController.create);
router.post("/users", userController.store);
router.get("/users/:id", userController.show);
router.get("/users/edit/:id/", userController.edit);
router.put("/users/:id", userController.update);
router.delete("/users/:id", userController.destroy);
router.post("/users/bulk-delete", userController.bulkDestroy);
router.put("/users/bulk-role", userController.bulkUpdateRole);

export default router;