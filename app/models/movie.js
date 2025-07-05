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

const movieSchema = new Schema(
  {
    type: { type: String, enum: ["iran", "non iran"], required: true },
    isDubed: { type: Boolean, default: false },
    hasSub: { type: Boolean, default: false },
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
    creationYear: { type: Number },
    pgRating: [{ type: String }],
    language: { type: String },
    country: { type: String },
    MeatScore: { type: Number },
    boxOffice: { type: Number },
    genres: [{ type: Schema.Types.ObjectId, ref: "Genre" }],
    length: { type: Number },
    summary: { type: String },
    links: [linkSchema],
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    toJSON: { virtuals: true },
  }
);

export default mongoose.model("Movie", movieSchema);
