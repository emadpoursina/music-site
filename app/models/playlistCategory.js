import mongoose from "mongoose";

const Schema = mongoose.Schema;

const playlistCategorySchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    toJSON: { virtuals: true },
  }
);

export default mongoose.model("PlaylistCategory", playlistCategorySchema);
