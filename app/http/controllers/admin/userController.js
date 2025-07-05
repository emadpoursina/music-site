import Controller from "../controller.js";
import User from "../../../models/user.js";
import mongoose from "mongoose";

class UserController extends Controller {
  // GET /admin/users - List all users
  async index(req, res) {
    try {
      const { name, email, role } = req.query;

      let filter = {};

      // Filter by user name
      if (name) {
        filter.name = { $regex: name, $options: "i" };
      }

      // Filter by email
      if (email) {
        filter.email = { $regex: email, $options: "i" };
      }

      // Filter by role
      if (role) {
        filter.role = role;
      }

      const users = await User.find(filter)
        .select("-password") // Exclude password from response
        .sort({ createdAt: -1 });

      res.json({ success: true, data: users });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // GET /admin/users/create - Show create form
  async create(req, res) {
    res.json({ success: true, message: "Create user form" });
  }

  // POST /admin/users - Store new user
  async store(req, res) {
    try {
      const { name, email, password, avatarUrl, role } = req.body;

      const user = new User({
        name,
        email,
        password,
        avatarUrl,
        role: role || "user",
      });

      await user.save();

      // Return user without password
      const userResponse = user.toObject();
      delete userResponse.password;

      res.status(201).json({ success: true, data: userResponse });
    } catch (error) {
      if (error.code === 11000) {
        return res.status(400).json({
          success: false,
          message: "User with this email already exists",
        });
      }
      res.status(400).json({ success: false, message: error.message });
    }
  }

  // GET /admin/users/:id - Show user details
  async show(req, res) {
    try {
      const user = await User.findById(req.params.id).select("-password");

      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }

      res.json({ success: true, data: user });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // GET /admin/users/:id/edit - Show edit form
  async edit(req, res) {
    try {
      const user = await User.findById(req.params.id).select("-password");

      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }

      res.json({ success: true, data: user });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // PUT /admin/users/:id - Update user
  async update(req, res) {
    try {
      const { name, email, avatarUrl, role } = req.body;

      const updateData = {
        name,
        email,
        avatarUrl,
        role,
      };

      const user = await User.findByIdAndUpdate(req.params.id, updateData, {
        new: true,
        runValidators: true,
      }).select("-password");

      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }

      res.json({ success: true, data: user });
    } catch (error) {
      if (error.code === 11000) {
        return res.status(400).json({
          success: false,
          message: "User with this email already exists",
        });
      }
      res.status(400).json({ success: false, message: error.message });
    }
  }

  // DELETE /admin/users/:id - Delete user
  async destroy(req, res) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);

      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }

      res.json({ success: true, message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // POST /admin/users/bulk-delete - Bulk delete users
  async bulkDestroy(req, res) {
    try {
      const { userIds } = req.body;

      if (!userIds || !Array.isArray(userIds) || userIds.length === 0) {
        return res
          .status(400)
          .json({ success: false, message: "User IDs array is required" });
      }

      // Validate that all IDs are valid ObjectIds
      const validIds = userIds.filter((id) =>
        mongoose.Types.ObjectId.isValid(id)
      );

      if (validIds.length !== userIds.length) {
        return res
          .status(400)
          .json({ success: false, message: "Some user IDs are invalid" });
      }

      const result = await User.deleteMany({ _id: { $in: userIds } });

      if (result.deletedCount === 0) {
        return res
          .status(404)
          .json({ success: false, message: "No users found to delete" });
      }

      res.json({
        success: true,
        message: `${result.deletedCount} user(s) deleted successfully`,
        deletedCount: result.deletedCount,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // PUT /admin/users/bulk-role - Bulk update user roles
  async bulkUpdateRole(req, res) {
    try {
      const { userIds, role } = req.body;

      if (!userIds || !Array.isArray(userIds) || userIds.length === 0) {
        return res
          .status(400)
          .json({ success: false, message: "User IDs array is required" });
      }

      if (!role || !["user", "admin"].includes(role)) {
        return res
          .status(400)
          .json({
            success: false,
            message: "Valid role (user or admin) is required",
          });
      }

      // Validate that all IDs are valid ObjectIds
      const validIds = userIds.filter((id) =>
        mongoose.Types.ObjectId.isValid(id)
      );

      if (validIds.length !== userIds.length) {
        return res
          .status(400)
          .json({ success: false, message: "Some user IDs are invalid" });
      }

      const result = await User.updateMany(
        { _id: { $in: userIds } },
        { role },
        { runValidators: true }
      );

      if (result.matchedCount === 0) {
        return res
          .status(404)
          .json({ success: false, message: "No users found to update" });
      }

      res.json({
        success: true,
        message: `${result.modifiedCount} user(s) role updated to ${role}`,
        modifiedCount: result.modifiedCount,
        role,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

export default new UserController();
