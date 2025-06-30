import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true },
    content: { type: String, required: true },
    coverImageUrl: { type: String },
    author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    tags: [{ type: String }],
}, { timestamps: true, toJSON: { virtuals: true } });

export default mongoose.model('Post', postSchema) 