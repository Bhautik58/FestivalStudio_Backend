import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    festival_name: {
        type: String,
        required: true,
        trim: true,
    },
    festival_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Festival',
        required: true,
    },
    post_image: {
        type: String,
        required: true,
    }
}, { timestamps: true });

export const PostModel = mongoose.model('Post', PostSchema);
