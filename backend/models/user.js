const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: true,
        unique: true,
    },
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true, 
        unique: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    bio: { 
        type: String, 
        maxlength: 160 // Maximum length similar to Instagram
    },
    profileImage: { 
        type: String, // URL or file path to the profile image 
    },
    gender: { 
        type: String, 
        enum: ['Male', 'Female', 'Other'], // Optional enumeration for gender
        default: 'Other' 
    },
    followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    posts: [
        { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Post' 
        }
    ]
});

module.exports = mongoose.model('User', userSchema);
