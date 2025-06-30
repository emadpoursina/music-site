import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const genreSchema = Schema({
    name: { type: String, required: true },
}, { timestamps: true, toJSON: { virtuals: true } });

export default mongoose.model('Genre', genreSchema) 