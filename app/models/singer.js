import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const socialLinksSchema = new Schema({
    instagram: String,
    twitter: String,
    youtube: String,
    website: String
}, { _id: false });

const singerSchema = new Schema({
    name: { type: String, unique: true, required: true },
    bio: { type: String },
    avatarUrl: { type: String },
    socialLinks: socialLinksSchema,
}, { timestamps: { createdAt: true, updatedAt: false }, toJSON: { virtuals: true } });

export default mongoose.model('Singer', singerSchema) 