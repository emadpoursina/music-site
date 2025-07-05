import mongoose from "mongoose";

const Schema = mongoose.Schema;

const seriesSchema = new Schema(
  {
    persianName: { type: String, required: true },
    englishName: { type: String },
    imdbId: { type: String },
    imdbScore: { type: Number },
    imdbVote: { type: Number },
    imageUrl: { type: String },
    trailerUrl: { type: String },
    director: { type: Schema.Types.ObjectId, ref: "People" },
    star: [{ type: Schema.Types.ObjectId, ref: "People" }],
    players: [{ type: Schema.Types.ObjectId, ref: "People" }],
    startProductionYear: { type: Number },
    endProductionYear: { type: Number },
    pgRating: { type: String },
    language: { type: String },
    country: { type: String },
    MeatScore: { type: Number },
    genres: [{ type: Schema.Types.ObjectId, ref: "Genre" }],
    length: { type: Number },
    seasonCount: { type: Number },
    summary: { type: String },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    toJSON: { virtuals: true },
  }
);

export default mongoose.model("Series", seriesSchema);
