import mongoose from "mongoose";

const Schema = mongoose.Schema;

const linkSchema = new Schema(
  {
    number: { type: Number },
    text: { type: String },
    url: { type: String },
  },
  { _id: false }
);

const episodeSchema = new Schema(
  {
    series: { type: Schema.Types.ObjectId, ref: "Series", required: true },
    seasonNumber: { type: Number, required: true },
    episodeNumber: { type: Number, required: true },
    links: [linkSchema],
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    toJSON: { virtuals: true },
  }
);

export default mongoose.model("Episode", episodeSchema);
