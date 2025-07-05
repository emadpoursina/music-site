import express from "express";
import pageRouter from "./page.js";
import singerRouter from "./singer.js";
import albumRouter from "./album.js";
import genreRouter from "./genre.js";
import trackRouter from "./track.js";
import postRouter from "./post.js";
import authRouter from "./auth.js";
import adminRouter from "./admin.js";

// Middlewares
import redirectIfNotAuthenticated from "../../http/middlewares/redirectIfNotAuthenticated.js";
import redirectIfNotAdmin from "../../http/middlewares/redirectIfNotAdmin.js";
// const errorHandler = require('app/http/middleware/errorHandler');

const router = express.Router();

// Single Page Router
router.use("/", pageRouter);

// Admin Router
router.use(
  "/admin",
  redirectIfNotAuthenticated,
  redirectIfNotAdmin,
  adminRouter
);

// Models Router
router.use("/singer", singerRouter);
router.use("/album", albumRouter);
router.use("/genre", genreRouter);
router.use("/track", trackRouter);
router.use("/post", postRouter);

// Auth Router
router.use("/auth", redirectIfNotAuthenticated, authRouter);

// Handle Errors
// router.all('*' , errorHandler.error404);
// router.use(errorHandler.handler)

export default router;
