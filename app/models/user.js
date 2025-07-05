import mongoose from "mongoose";
import bcrypt from "bcrypt";
import uniqueString from "unique-string";
import mongoosePaginate from "mongoose-paginate";

const Schema = mongoose.Schema;

const playlistSchema = new Schema(
  {
    name: { type: String, required: true },
    tracks: [{ type: Schema.Types.ObjectId, ref: "Track" }],
  },
  { _id: false }
);

const userSchema = new Schema(
  {
    name: { type: String, minLength: 3, maxLength: 50, required: true },
    email: {
      type: String,
      minLength: 3,
      maxLength: 255,
      required: true,
      unique: true,
    },
    password: { type: String, minLength: 3, maxLength: 1024, required: true },
    avatarUrl: { type: String },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    likedTracks: [{ type: Schema.Types.ObjectId, ref: "Track" }],
    playlists: [playlistSchema],
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

userSchema.plugin(mongoosePaginate);

userSchema.methods.hashPassword = function (password) {
  let salt = bcrypt.genSaltSync(15);
  let hash = bcrypt.hashSync(password, salt);

  return hash;
};

userSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.methods.setRememberToken = function (res) {
  const token = uniqueString();
  res.cookie("remember_token", token, {
    maxAge: 1000 * 60 * 60 * 24 * 90,
    httpOnly: true,
    signed: true,
  });
  this.updateOne({ rememberToken: token }, (err) => {
    if (err) console.log(err);
  });
};

export default mongoose.model("User", userSchema);
