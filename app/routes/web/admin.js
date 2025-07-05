import express from "express";
const router = express.Router();

// Controllers
import adminController from "../../http/controllers/admin/adminController.js";
import trackController from "../../http/controllers/admin/trackController.js";
import singerController from "../../http/controllers/admin/singerController.js";
import albumController from "../../http/controllers/admin/albumController.js";
import genreController from "../../http/controllers/admin/genreController.js";
import userController from "../../http/controllers/admin/userController.js";
import playlistController from "../../http/controllers/admin/playlistController.js";
import playlistCategoryController from "../../http/controllers/admin/playlistCategoryController.js";
import peopleController from "../../http/controllers/admin/peopleController.js";
import movieController from "../../http/controllers/admin/movieController.js";
import seriesController from "../../http/controllers/admin/seriesController.js";
import episodeController from "../../http/controllers/admin/episodeController.js";
import settingController from "../../http/controllers/admin/settingController.js";

// Admin Routes
router.get("/dashboard", adminController.dashboard);

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

// Admin Playlists Routes
router.get("/playlists", playlistController.index);
router.get("/playlists/create", playlistController.create);
router.post("/playlists", playlistController.store);
router.get("/playlists/:id", playlistController.show);
router.get("/playlists/edit/:id/", playlistController.edit);
router.put("/playlists/:id", playlistController.update);
router.delete("/playlists/:id", playlistController.destroy);
router.post("/playlists/bulk-delete", playlistController.bulkDestroy);

// Admin Playlist Categories Routes
router.get("/playlist-categories", playlistCategoryController.index);
router.get("/playlist-categories/create", playlistCategoryController.create);
router.post("/playlist-categories", playlistCategoryController.store);
router.get("/playlist-categories/:id", playlistCategoryController.show);
router.get("/playlist-categories/edit/:id/", playlistCategoryController.edit);
router.put("/playlist-categories/:id", playlistCategoryController.update);
router.delete("/playlist-categories/:id", playlistCategoryController.destroy);
router.post(
  "/playlist-categories/bulk-delete",
  playlistCategoryController.bulkDestroy
);

// Admin People Routes
router.get("/people", peopleController.index);
router.get("/people/create", peopleController.create);
router.post("/people", peopleController.store);
router.get("/people/:id", peopleController.show);
router.get("/people/edit/:id/", peopleController.edit);
router.put("/people/:id", peopleController.update);
router.delete("/people/:id", peopleController.destroy);
router.post("/people/bulk-delete", peopleController.bulkDestroy);

// Admin Movies Routes
router.get("/movies", movieController.index);
router.get("/movies/create", movieController.create);
router.post("/movies", movieController.store);
router.get("/movies/:id", movieController.show);
router.get("/movies/edit/:id/", movieController.edit);
router.put("/movies/:id", movieController.update);
router.delete("/movies/:id", movieController.destroy);
router.post("/movies/bulk-delete", movieController.bulkDestroy);

// Admin Series Routes
router.get("/series", seriesController.index);
router.get("/series/create", seriesController.create);
router.post("/series", seriesController.store);
router.get("/series/:id", seriesController.show);
router.get("/series/edit/:id/", seriesController.edit);
router.put("/series/:id", seriesController.update);
router.delete("/series/:id", seriesController.destroy);
router.post("/series/bulk-delete", seriesController.bulkDestroy);

// Admin Episodes Routes
router.get("/episodes", episodeController.index);
router.get("/episodes/create", episodeController.create);
router.post("/episodes", episodeController.store);
router.get("/episodes/:id", episodeController.show);
router.get("/episodes/edit/:id/", episodeController.edit);
router.put("/episodes/:id", episodeController.update);
router.delete("/episodes/:id", episodeController.destroy);
router.post("/episodes/bulk-delete", episodeController.bulkDestroy);

// Admin Settings Routes
router.get("/settings", settingController.index);
router.post("/settings", settingController.store);
router.get("/settings/:id", settingController.show);
router.put("/settings/:id", settingController.update);

export default router;
