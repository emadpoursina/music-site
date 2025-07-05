import mongoose from "mongoose";

const Schema = mongoose.Schema;

const settingSchema = new Schema({
  key: { type: String, required: true, unique: true },
  value: { type: Object, required: true }, // Value is an object
});

export default mongoose.model("Setting", settingSchema);
