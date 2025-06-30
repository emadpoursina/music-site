import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const commentSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    track: { type: Schema.Types.ObjectId, ref: 'Track', required: true },
    text: { type: String, required: true },
}, { timestamps: { createdAt: true, updatedAt: false }, toJSON: { virtuals: true } });

export default mongoose.model('Comment', commentSchema) 