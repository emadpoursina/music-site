export default function redirectIfNotAdmin(req, res, next) {
  if (req.user.role !== "admin") return res.status(403).redirect("/auth/login");

  next();
}
