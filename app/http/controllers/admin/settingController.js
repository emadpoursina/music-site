import Controller from "../controller.js";
import Setting from "../../../models/setting.js";
import mongoose from "mongoose";

class SettingController extends Controller {
  // GET /admin/settings - List all settings
  async index(req, res) {
    try {
      const settings = await Setting.find({}).sort({ key: 1 });
      res.json({ success: true, data: settings });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // POST /admin/settings - Store new setting
  async store(req, res) {
    try {
      const { key, value } = req.body;
      if (!key || typeof value !== "object" || value === null) {
        return res.status(400).json({
          success: false,
          message: "Key is required and value must be a non-null object",
        });
      }
      const setting = new Setting({ key, value });
      await setting.save();
      res.status(201).json({ success: true, data: setting });
    } catch (error) {
      if (error.code === 11000) {
        return res.status(400).json({
          success: false,
          message: "Setting with this key already exists",
        });
      }
      res.status(400).json({ success: false, message: error.message });
    }
  }

  // GET /admin/settings/:id - Show setting details
  async show(req, res) {
    try {
      const setting = await Setting.findById(req.params.id);
      if (!setting) {
        return res
          .status(404)
          .json({ success: false, message: "Setting not found" });
      }
      res.json({ success: true, data: setting });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // PUT /admin/settings/:id - Update setting
  async update(req, res) {
    try {
      const { value } = req.body; // Only allow value to be updated
      if (typeof value !== "object" || value === null) {
        return res.status(400).json({
          success: false,
          message: "Value must be a non-null object",
        });
      }
      const setting = await Setting.findByIdAndUpdate(
        req.params.id,
        { value },
        { new: true, runValidators: true }
      );
      if (!setting) {
        return res
          .status(404)
          .json({ success: false, message: "Setting not found" });
      }
      res.json({ success: true, data: setting });
    } catch (error) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
}

export default new SettingController();
