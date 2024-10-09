const mongoose = require("mongoose");

const groupChatSchema = new mongoose.Schema({
    groupName: {
        type: String,
        required: true,
        trim: true,
    },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    participants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        }
    ],
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message"
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    isArchived: {
        type: Boolean,
        default: false,
    }
});

module.exports = mongoose.model('GroupChat', groupChatSchema);
