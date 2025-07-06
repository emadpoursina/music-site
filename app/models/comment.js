import mongoose from "mongoose";

const Schema = mongoose.Schema;

const commentSchema = new Schema(
  {
    content: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    commentableType: {
      type: String,
      enum: ["track", "album", "series", "movie"],
      required: true,
    },
    commentableId: { type: Schema.Types.ObjectId, required: true },
    parentComment: { type: Schema.Types.ObjectId, ref: "Comment" },
    status: {
      type: String,
      enum: ["approved", "denied", "pending"],
      default: "pending",
    },
    createdAt: { type: Date, default: Date.now },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    toJSON: { virtuals: true },
  }
);

export default mongoose.model("Comment", commentSchema);
