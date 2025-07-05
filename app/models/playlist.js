import mongoose from "mongoose";

const Schema = mongoose.Schema;

const playlistSchema = new Schema(
  {
    category: {
      type: Schema.Types.ObjectId,
      ref: "PlaylistCategory",
      required: true,
    },
    status: { type: String, enum: ["iran", "non-iran"], required: true },
    isSpecial: { type: Boolean, default: false },
    name: { type: String, required: true },
    englishName: { type: String },
    avatarImage: { type: String },
    tracks: [{ type: Schema.Types.ObjectId, ref: "Track" }],
    description: { type: String },
    slug: { type: String, required: true, unique: true },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    toJSON: { virtuals: true },
  }
);

export default mongoose.model("Playlist", playlistSchema);
