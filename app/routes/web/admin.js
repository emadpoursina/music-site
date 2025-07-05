import express from "express";
const router = express.Router();

// Controllers
import adminController from "../../http/controllers/admin/adminController.js";

// Admin Routes
router.get("/", adminController.index);

export default router;
