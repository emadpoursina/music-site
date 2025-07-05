import Controller from "../controller.js";

class AdminController extends Controller {
  async index(req, res) {
    res.send("Admin Index");
  }
}

export default new AdminController();
