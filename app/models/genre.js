import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const genreSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
}, { timestamps: { createdAt: true, updatedAt: false }, toJSON: { virtuals: true } });

export default mongoose.model('Genre', genreSchema) 