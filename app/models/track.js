import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const trackSchema = new Schema({
    title: { type: String, required: true },
    singer: { type: Schema.Types.ObjectId, ref: 'Singer' },
    album: { type: Schema.Types.ObjectId, ref: 'Album' },
    genre: { type: Schema.Types.ObjectId, ref: 'Genre' },
    audioUrl: { type: String },
    coverImageUrl: { type: String },
    uploadedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    duration: { type: Number },
    plays: { type: Number, default: 0 },
}, { timestamps: { createdAt: true, updatedAt: false }, toJSON: { virtuals: true } });

export default mongoose.model('Track', trackSchema)