import mongoose from "mongoose";

const Schema = mongoose.Schema;

const peopleSchema = new Schema(
  {
    persianName: { type: String, required: true },
    englishName: { type: String },
    slug: { type: String, required: true, unique: true },
    imageUrl: { type: String },
    popularity: { type: Number, min: 0, max: 1 },
    birthDate: { type: Date },
    birthPlace: { type: String },
    deathDate: { type: Date },
    sex: { type: String, enum: ["man", "woman"] },
    website: { type: String },
    imdbId: { type: String },
    bio: { type: String },
    isDirector: { type: Boolean, default: false },
    isActor: { type: Boolean, default: false },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
    toJSON: { virtuals: true },
  }
);

export default mongoose.model("People", peopleSchema);
