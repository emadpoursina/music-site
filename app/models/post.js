import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const postSchema = Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
}, { timestamps: true, toJSON: { virtuals: true } });

export default mongoose.model('Post', postSchema) 