const conversationModel = require("../models/conversation");
const messageModel = require("../models/message");
const groupModel = require("../models/groupChat");
const { getReceiverSocketId, io } = require("../socket/socket");
const userModel = require("../models/user");

const sendMessage = async (req, res) => {
    try {
        const senderId = req.user.userid;
        const receiverId = req.params.id;
        const { textMessage: message } = req.body;

        let conversation = await conversationModel.findOne({
            participants: { $all: [senderId, receiverId] }
        });

        if (!conversation) {
            conversation = await conversationModel.create({
                participants: [senderId, receiverId]
            })
        };

        const newMessage = await messageModel.create({
            senderId,
            receiverId,
            message,
        })

        if (newMessage) conversation.messages.push(newMessage._id);

        await Promise.all([conversation.save(), newMessage.save()])

        // Implement Socket.io for real-time data transfer
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit('newMessage', newMessage);
        }

        return res.status(201).json({
            success: true,
            newMessage
        })
    } catch (error) {
        console.log("line 37 messageController.js", error);
    }
}

const getMessage = async (req, res) => {
    try {
        const senderId = req.user.userid;
        const receiverId = req.params.id;
        console.log("Sender ID:", senderId, "Receiver ID:", receiverId);
        const conversation = await conversationModel.findOne({
            participants: { $all: [senderId, receiverId] }
        }).populate('messages');

        if (!conversation) {
            return res.status(200).json({ success: true, messages: [] });
        }

        return res.status(200).json({ success: true, messages: conversation.messages });
    } catch (error) {
        console.log("line 55 messageController.js", error);
    }
}

// Backend API for creating a group
// const createGroup = async (req, res) => {
//     const { groupName, participants } = req.body;
//     const creatorId = req.user.userid;

//     try {
//         // Create the group and include the creator in the participants array
//         const group = await groupModel.create({
//             groupName,
//             participants: [...participants, creatorId],
//             admin: creatorId, // assuming the creator is the admin
//         });

//         // Notify all participants (including the creator) about the new group
//         const allParticipants = [...participants, creatorId];

//         // Update each user's group list
//         await Promise.all(allParticipants.map(async (participantId) => {
//             const user = await userModel.findById(participantId);
//             user.groups.push(group._id);
//             await user.save();
//         }));

//         // Send the group info to all participants
//         res.json({ group });
//     } catch (error) {
//         res.status(500).json({ message: 'Error creating group', error });
//     }
// }; 

const createGroup = async (req, res) => {
    const { groupName, participants } = req.body;
    const creatorId = req.user.userid;

    try {
        // Create the group and include the creator in the participants array
        const group = await groupModel.create({
            groupName,
            participants: [...participants, creatorId],
            admin: creatorId, // Assuming the creator is the admin
        });

        // Notify all participants (including the creator) about the new group
        const allParticipants = [...participants, creatorId];

        // Update each user's group list
        await Promise.all(allParticipants.map(async (participantId) => {
            const user = await userModel.findById(participantId);
            user.groups.push(group._id);
            await user.save();
        }));

        // Send the group info back to the client
        res.json({ group });
    } catch (error) {
        console.error('Error creating group:', error);
        res.status(500).json({ message: 'Error creating group', error });
    }
};



// Fetch groups where the user is a participant
const getGroupsForUser = async (req, res) => {
    try {
        console.log(req.user);
        console.log(req.user.userid)
        const userId = req.user.userid; // Assuming the user is authenticated and their ID is available

        // Fetch groups where the logged-in user is a participant
        const groups = await groupModel.find({ participants: userId });

        if (!groups || groups.length === 0) {
            return res.status(200).json({ success: true, groups: [] });
        }

        return res.status(200).json({ success: true, groups });
    } catch (error) {
        console.log("Error in getGroupsForUser:", error);
        return res.status(500).json({ success: false, message: 'Failed to fetch groups' });
    }
};

// Handle group messaging
const sendMessageToGroup = async (req, res) => {
    try {
        const senderId = req.user.userid;
        const groupId = req.params.groupId;
        const { textMessage: message } = req.body;

        const group = await groupModel.findById(groupId);

        if (!group) {
            return res.status(404).json({ success: false, message: "Group not found" });
        }

        const newMessage = await messageModel.create({
            senderId,
            groupId,
            message,
        });

        group.messages.push(newMessage._id);
        await group.save();

        // Emit the group message via socket to all members in the group
        io.to(groupId).emit('groupMessage', {
            userId: senderId,
            message,
            time: new Date().toLocaleTimeString(),
        });

        return res.status(201).json({
            success: true,
            newMessage
        });
    } catch (error) {
        console.log("Error in sendMessageToGroup:", error);
        return res.status(500).json({ success: false, error });
    }
};

// Join group
const joinGroup = async (req, res) => {
    try {
        const userId = req.user.userid;
        const groupId = req.params.groupId;

        const group = await groupModel.findById(groupId);

        if (!group) {
            return res.status(404).json({ success: false, message: "Group not found" });
        }

        // Add the user to the group if not already a participant
        if (!group.participants.includes(userId)) {
            group.participants.push(userId);
            await group.save();
        }

        // Join the socket.io room for the group
        const socket = io.sockets.sockets.get(userId);
        if (socket) {
            socket.join(groupId);
            io.to(groupId).emit('userJoinedGroup', { userId, groupId });
        }

        return res.status(200).json({
            success: true,
            group
        });
    } catch (error) {
        console.log("Error in joinGroup:", error);
        return res.status(500).json({ success: false, error });
    }
};

// Leave group
const leaveGroup = async (req, res) => {
    try {
        const userId = req.user.userid;
        const groupId = req.params.groupId;

        const group = await groupModel.findById(groupId);

        if (!group) {
            return res.status(404).json({ success: false, message: "Group not found" });
        }

        // Remove the user from the group's participant list
        group.participants = group.participants.filter(id => id !== userId);
        await group.save();

        // Leave the socket.io room for the group
        const socket = io.sockets.sockets.get(userId);
        if (socket) {
            socket.leave(groupId);
            io.to(groupId).emit('userLeftGroup', { userId, groupId });
        }

        return res.status(200).json({
            success: true,
            message: 'Successfully left the group'
        });
    } catch (error) {
        console.log("Error in leaveGroup:", error);
        return res.status(500).json({ success: false, error });
    }
};

module.exports = {
    sendMessage,
    getMessage,
    createGroup,
    getGroupsForUser,
    sendMessageToGroup,
    joinGroup,
    leaveGroup
};
