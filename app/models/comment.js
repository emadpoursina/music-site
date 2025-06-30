import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const commentSchema = Schema({
    content: { type: String, required: true },
}, { timestamps: true, toJSON: { virtuals: true } });

export default mongoose.model('Comment', commentSchema) 