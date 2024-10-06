const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    caption: {
        type: String,
        trim: true
    },
    image: {
        type: String, // URL or path to the image file
        default: null
    },
    video: {
        type: String, // URL or path to the video file
        default: null
    },
    mediaType: {
        type: String, // 'image' or 'video'
        enum: ['image', 'video'],
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Post', postSchema);