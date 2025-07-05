import Controller from "../controller.js";
import User from "../../../models/user.js";
import Album from "../../../models/album.js";
import Track from "../../../models/track.js";

class AdminController extends Controller {
  // GET /admin/dashboard - Show admin dashboard with statistics
  async dashboard(req, res) {
    try {
      // Get current date and calculate date ranges
      const now = new Date();
      const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

      // Get total counts
      const totalUsers = await User.countDocuments();
      const totalAlbums = await Album.countDocuments();
      const totalTracks = await Track.countDocuments();

      // Get users created in last week
      const usersLastWeek = await User.countDocuments({
        createdAt: { $gte: oneWeekAgo },
      });

      // Get users created in last month
      const usersLastMonth = await User.countDocuments({
        createdAt: { $gte: oneMonthAgo },
      });

      // Get 10 latest tracks with populated data
      const latestTracks = await Track.find()
        .populate("singer", "name")
        .populate("album", "title")
        .populate("genre", "name")
        .sort({ createdAt: -1 })
        .limit(10);

      // Prepare dashboard data
      const dashboardData = {
        statistics: {
          totalUsers,
          totalAlbums,
          totalTracks,
          usersLastWeek,
          usersLastMonth,
        },
        latestTracks,
      };

      res.json({ success: true, data: dashboardData });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

export default new AdminController();
