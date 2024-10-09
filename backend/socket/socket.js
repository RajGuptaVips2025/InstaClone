const { Server } = require("socket.io");
const express = require("express");
const http = require("http");

const app = express(); // 1. Initialize an Express app
const server = http.createServer(app); // 2. Create an HTTP server using Express

// 3. Set up a Socket.IO server with CORS settings
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173', // 4. Allow connections from this URL
        methods: ['GET', 'POST'] // 5. Allow only GET and POST HTTP methods
    }
});

// 6. Maps userId to their socketId for one-to-one chats
const userSocketMap = {};

// 7. Maps groupId to an array of userIds for managing group chats
const groupMap = {};

// 8. Helper function to get the socket ID of a specific user by their userId
const getReceiverSocketId = (receiverId) => userSocketMap[receiverId];

// 9. Function to handle when a user joins a group
const joinGroup = (groupId, userId, socket) => {
    if (!groupMap[groupId]) { // 10. If group doesn't exist, create it
        groupMap[groupId] = [];
    }

    if (!groupMap[groupId].includes(userId)) { // 11. Add user to the group if not already in it
        groupMap[groupId].push(userId); // 12. Add userId to the groupMap
        socket.join(groupId); // 13. Make the user join the corresponding Socket.IO room (group)
        io.to(groupId).emit('userJoinedGroup', { userId, groupId }); // 14. Notify group members that a user has joined
        console.log(`User ${userId} joined group ${groupId}`); // 15. Log the event on the server
    }

    // 16. Send the list of group members to the user who just joined
    socket.emit('groupMembers', { groupId, members: groupMap[groupId] });
};

// 17. Function to handle when a user leaves a group
const leaveGroup = (groupId, userId, socket) => {
    if (groupMap[groupId]) {
        groupMap[groupId] = groupMap[groupId].filter(id => id !== userId); // 18. Remove userId from the group
        socket.leave(groupId); // 19. Make the user leave the Socket.IO room (group)
        io.to(groupId).emit('userLeftGroup', { userId, groupId }); // 20. Notify group members that a user has left
        console.log(`User ${userId} left group ${groupId}`); // 21. Log the event on the server
    }
};

// 22. Listen for new WebSocket connections
io.on('connection', (socket) => {
    const userId = socket.handshake.query.userId; // 23. Extract userId from query parameters of the connection

    if (userId) { // 24. If userId exists, store the userId and socketId in userSocketMap
        userSocketMap[userId] = socket.id; // 25. Map userId to the socket.id
        console.log(`User connected: UserId = ${userId}, SocketId = ${socket.id}`); // 26. Log user connection
    }

    // 27. Emit the list of online users to all connected clients
    io.emit('getOnlineUsers', Object.keys(userSocketMap));

    // 28. Listen for the 'joinGroup' event, which occurs when a user joins a group
    socket.on('joinGroup', ({ groupId }) => {
        joinGroup(groupId, userId, socket); // 29. Call joinGroup to add the user to the specified group
    });

    // 30. Listen for the 'leaveGroup' event, which occurs when a user leaves a group
    socket.on('leaveGroup', ({ groupId }) => {
        leaveGroup(groupId, userId, socket); // 31. Call leaveGroup to remove the user from the specified group
    });

    // 32. Listen for 'sendMessageToGroup' event to send messages in a group
    socket.on('sendMessageToGroup', ({ groupId, message }) => {
        // 33. Check if the user is part of the group before sending the message
        if (groupMap[groupId] && groupMap[groupId].includes(userId)) {
            io.to(groupId).emit('groupMessage', {
                userId, // 34. Include the userId of the sender
                message, // 35. Include the message content
                time: new Date().toLocaleTimeString(), // 36. Add a timestamp to the message
            });
            console.log(`User ${userId} sent message to group ${groupId}: ${message}`); // 37. Log the event
        } else {
            socket.emit('error', 'You are not a member of this group.'); // 38. Send error if user is not in the group
        }
    });

    // 39. Listen for disconnection of the user
    socket.on('disconnect', () => {
        if (userId) {
            console.log(`User disconnected: UserId = ${userId}, SocketId = ${socket.id}`); // 40. Log user disconnection
            delete userSocketMap[userId]; // 41. Remove the user from the online list

            // 42. Remove the user from all groups they are part of
            for (let groupId in groupMap) {
                leaveGroup(groupId, userId, socket); // 43. Call leaveGroup for each group the user is part of
            }
        }

        // 44. Emit the updated list of online users
        io.emit('getOnlineUsers', Object.keys(userSocketMap));
    });
});

// 45. Export the app, server, io instance, and helper functions
module.exports = { app, server, io, getReceiverSocketId };

// 1 .on:
// Listens for an event from the client or another part of the server.When the event is triggered, the callback function is executed.
// Example: socket.on('joinGroup', callback) – This listens for a joinGroup event and executes the callback when it receives that event.

// 2 .emit:
// Sends an event with data to the client or server.It can be sent to a specific client or broadcasted to multiple clients.
// Example: socket.emit('groupMembers', data) – Sends the groupMembers event along with the data to the client that initiated the connection.

// 3 .to:
// Targets a specific "room" or group of clients that are part of the same room.It is commonly used in group chat functionality to send events to specific groups of users.
// Example: io.to(groupId).emit('groupMessage', message) – Sends the groupMessage event with the message to all clients who have joined the group with groupId.
