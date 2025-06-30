import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const albumSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    releaseDate: { type: Date },
    coverImageUrl: { type: String },
    singer: { type: Schema.Types.ObjectId, ref: 'Singer' },
    genre: { type: Schema.Types.ObjectId, ref: 'Genre' },
    tracks: [{ type: Schema.Types.ObjectId, ref: 'Track' }],
}, { timestamps: { createdAt: true, updatedAt: false }, toJSON: { virtuals: true } });

export default mongoose.model('Album', albumSchema) 