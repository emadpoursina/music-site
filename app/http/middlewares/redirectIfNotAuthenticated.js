import config from "config";
import jwt from "jsonwebtoken";

// Verify JWt token
export default function redirectIfNotAuthenticated(req, res, next) {
  const token = req.cookies.token;

  if (!token) return res.status(401).redirect("/auth/login");

  try {
    const decoded = jwt.verify(token, config.get("jwt.secret"));
    req.user = decoded; // set user in request
    next();
  } catch (err) {
    return res.status(401).redirect("/auth/login");
  }
}
