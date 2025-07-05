import Controller from "../controller.js";
import User from "../../../models/user.js";

class loginController extends Controller {
  showLoginForm(req, res) {
    res.send("login form");
  }

  async login(req, res, next) {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    try {
      const user = await User.findOne({ email });
      if (!user)
        return res.status(401).json({ message: "Invalid credentials." });

      const isMatch = user.comparePassword(password);
      if (!isMatch)
        return res.status(401).json({ message: "Invalid credentials." });

      const token = user.generateAuthToken();

      // Set cookie
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      // Send user info
      const userResponse = {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatarUrl: user.avatarUrl,
        role: user.role,
      };

      res.status(200).json({ message: "Login successful", user: userResponse });
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  }
}

export default new loginController();
