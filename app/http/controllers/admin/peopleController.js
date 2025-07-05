import Controller from "../controller.js";
import People from "../../../models/people.js";
import mongoose from "mongoose";

class PeopleController extends Controller {
  // GET /admin/people - List all people (filter by name)
  async index(req, res) {
    try {
      const { name } = req.query;
      let filter = {};
      if (name) {
        filter.$or = [
          { persianName: { $regex: name, $options: "i" } },
          { englishName: { $regex: name, $options: "i" } },
        ];
      }
      const people = await People.find(filter).sort({ createdAt: -1 });
      res.json({ success: true, data: people });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // GET /admin/people/create - Show create form
  async create(req, res) {
    res.json({ success: true, message: "Create people form" });
  }

  // POST /admin/people - Store new person
  async store(req, res) {
    try {
      const person = new People(req.body);
      await person.save();
      res.status(201).json({ success: true, data: person });
    } catch (error) {
      if (error.code === 11000) {
        return res
          .status(400)
          .json({
            success: false,
            message: "Person with this slug already exists",
          });
      }
      res.status(400).json({ success: false, message: error.message });
    }
  }

  // GET /admin/people/:id - Show person details
  async show(req, res) {
    try {
      const person = await People.findById(req.params.id);
      if (!person) {
        return res
          .status(404)
          .json({ success: false, message: "Person not found" });
      }
      res.json({ success: true, data: person });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // GET /admin/people/edit/:id - Show edit form
  async edit(req, res) {
    try {
      const person = await People.findById(req.params.id);
      if (!person) {
        return res
          .status(404)
          .json({ success: false, message: "Person not found" });
      }
      res.json({ success: true, data: person });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // PUT /admin/people/:id - Update person
  async update(req, res) {
    try {
      const person = await People.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });
      if (!person) {
        return res
          .status(404)
          .json({ success: false, message: "Person not found" });
      }
      res.json({ success: true, data: person });
    } catch (error) {
      if (error.code === 11000) {
        return res
          .status(400)
          .json({
            success: false,
            message: "Person with this slug already exists",
          });
      }
      res.status(400).json({ success: false, message: error.message });
    }
  }

  // DELETE /admin/people/:id - Delete person
  async destroy(req, res) {
    try {
      const person = await People.findByIdAndDelete(req.params.id);
      if (!person) {
        return res
          .status(404)
          .json({ success: false, message: "Person not found" });
      }
      res.json({ success: true, message: "Person deleted successfully" });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  // POST /admin/people/bulk-delete - Bulk delete people
  async bulkDestroy(req, res) {
    try {
      const { peopleIds } = req.body;
      if (!peopleIds || !Array.isArray(peopleIds) || peopleIds.length === 0) {
        return res
          .status(400)
          .json({ success: false, message: "People IDs array is required" });
      }
      const validIds = peopleIds.filter((id) =>
        mongoose.Types.ObjectId.isValid(id)
      );
      if (validIds.length !== peopleIds.length) {
        return res
          .status(400)
          .json({ success: false, message: "Some people IDs are invalid" });
      }
      const result = await People.deleteMany({ _id: { $in: peopleIds } });
      if (result.deletedCount === 0) {
        return res
          .status(404)
          .json({ success: false, message: "No people found to delete" });
      }
      res.json({
        success: true,
        message: `${result.deletedCount} person(s) deleted successfully`,
        deletedCount: result.deletedCount,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

export default new PeopleController();
