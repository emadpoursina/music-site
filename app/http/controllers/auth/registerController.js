import Controller from "../controller.js";
import User from "../../../models/user.js";

class RegisterController extends Controller {
  showRegsitrationForm(req, res) {
    res.send("Register Form");
  }

  async register(req, res) {
    const { name, email, password } = req.body;

    try {
      // Create new user
      const newUser = new User({
        name,
        email,
        password: "", // will hash below
      });

      newUser.password = newUser.hashPassword(password);

      await newUser.save();

      // Prepare response (omit password)
      const userResponse = {
        name: newUser.name,
        email: newUser.email,
        avatarUrl: newUser.avatarUrl,
        role: newUser.role,
      };

      res
        .status(201)
        .json({ message: "User registered successfully", user: userResponse });
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  }
}

export default new RegisterController();
