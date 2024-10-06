const conversationModel = require("../models/conversation");
const messageModel = require("../models/message");
const { getReceiverSocketId, io } = require("../socket/socket");

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

        // implement socket io for real time data transfer 
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            console.log(receiverSocketId)
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
        console.log("sender ke id :: ", senderId, "reciver kee idd ::  ", receiverId)
        const conversation = await conversationModel.findOne({
            participants: { $all: [senderId, receiverId] }
        }).populate('messages');

        if (!conversation) {
            return res.status(200).json({ success: true, messages: [] })};
            
            console.log('not conv')
        return res.status(200).json({ success: true, messages: conversation?.messages });

    } catch (error) {
        console.log("line 55 messageController.js", error);
    }
}

module.exports = { sendMessage, getMessage };
