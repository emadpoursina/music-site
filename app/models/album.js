import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const albumSchema = Schema({
    title: { type: String, required: true },
}, { timestamps: true, toJSON: { virtuals: true } });

export default mongoose.model('Album', albumSchema) 