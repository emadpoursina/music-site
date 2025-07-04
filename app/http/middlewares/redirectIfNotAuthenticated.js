import config from "config";
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token)
    return res.status(401).json({ message: "Access denied. No token." });

  try {
    const decoded = jwt.verify(token, config.get("jwt.secret"));
    req.user = decoded; // set user in request
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid or expired token." });
  }
};
