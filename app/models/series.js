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

// Validation middleware to check director and actor relationships
seriesSchema.pre("save", async function (next) {
  try {
    const People = mongoose.model("People");

    // Validate director
    if (this.director) {
      const director = await People.findById(this.director);
      if (!director) {
        return next(new Error("Director not found"));
      }
      if (!director.isDirector) {
        return next(new Error("Selected person is not a director"));
      }
    }

    // Validate star actors
    if (this.star && this.star.length > 0) {
      const stars = await People.find({ _id: { $in: this.star } });
      if (stars.length !== this.star.length) {
        return next(new Error("One or more star actors not found"));
      }
      for (const star of stars) {
        if (!star.isActor) {
          return next(
            new Error(
              `Person "${star.persianName}" is not an actor and cannot be assigned as star`
            )
          );
        }
      }
    }

    // Validate player actors
    if (this.players && this.players.length > 0) {
      const players = await People.find({ _id: { $in: this.players } });
      if (players.length !== this.players.length) {
        return next(new Error("One or more players not found"));
      }
      for (const player of players) {
        if (!player.isActor) {
          return next(
            new Error(
              `Person "${player.persianName}" is not an actor and cannot be assigned as player`
            )
          );
        }
      }
    }

    next();
  } catch (error) {
    next(error);
  }
});

// Validation middleware for updates
seriesSchema.pre("findOneAndUpdate", async function (next) {
  try {
    const People = mongoose.model("People");
    const update = this.getUpdate();

    // Validate director
    if (update.director) {
      const director = await People.findById(update.director);
      if (!director) {
        return next(new Error("Director not found"));
      }
      if (!director.isDirector) {
        return next(new Error("Selected person is not a director"));
      }
    }

    // Validate star actors
    if (update.star && update.star.length > 0) {
      const stars = await People.find({ _id: { $in: update.star } });
      if (stars.length !== update.star.length) {
        return next(new Error("One or more star actors not found"));
      }
      for (const star of stars) {
        if (!star.isActor) {
          return next(
            new Error(
              `Person "${star.persianName}" is not an actor and cannot be assigned as star`
            )
          );
        }
      }
    }

    // Validate player actors
    if (update.players && update.players.length > 0) {
      const players = await People.find({ _id: { $in: update.players } });
      if (players.length !== update.players.length) {
        return next(new Error("One or more players not found"));
      }
      for (const player of players) {
        if (!player.isActor) {
          return next(
            new Error(
              `Person "${player.persianName}" is not an actor and cannot be assigned as player`
            )
          );
        }
      }
    }

    next();
  } catch (error) {
    next(error);
  }
});

export default mongoose.model("Series", seriesSchema);
