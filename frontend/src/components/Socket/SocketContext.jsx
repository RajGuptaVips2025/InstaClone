import { setOnlineUsers } from '@/features/chatSlice'; // 1. Import Redux actions to manage groups and online users
import { setSocket } from '@/features/socketSlice'; // 2. Import Redux action to store the socket connection
import { useDispatch, useSelector } from 'react-redux'; // 3. Import Redux hooks for dispatching actions and accessing state
import { useEffect, useRef } from 'react'; // 4. Import React hooks for managing lifecycle and refs
import { io } from 'socket.io-client'; // 5. Import Socket.IO client

const SocketContext = () => {
    const userDetails = useSelector((state) => state?.user?.userDetail); // 6. Get user details from Redux state
    const dispatch = useDispatch(); // 7. Create dispatch function to send actions to the Redux store
    const socketRef = useRef(null); // 8. Create a ref to hold the socket connection instance

    // 9. Use useEffect to establish the socket connection when userDetails change
    useEffect(() => {
        if (userDetails) { // 10. If userDetails are present, create the socket connection
            const socketio = io('http://localhost:3000', { // 11. Connect to the backend server
                query: { userId: userDetails._id }, // 12. Send the user's ID with the connection request
                transports: ['websocket'], // 13. Use WebSocket for real-time communication
            });

            socketRef.current = socketio; // 14. Save the socket instance in a ref for future use
            dispatch(setSocket(socketio)); // 15. Dispatch the socket instance to the Redux store

            // 16. Listen for the 'getOnlineUsers' event from the server
            socketio.on('getOnlineUsers', (onlineUsers) => {
                dispatch(setOnlineUsers(onlineUsers)); // 17. Dispatch the online users list to the Redux store
            });

            // 18. Listen for a new one-to-one message from the server
            socketio.on('newMessage', (newMessage) => {
                dispatch(setMessages((prevMessages) => [...prevMessages, newMessage])); // 19. Append the new message to the existing messages
            });

            // 20. Listen for a new group message from the server
            socketio.on('groupMessage', (newGroupMessage) => {
                dispatch(setMessages((prevMessages) => [...prevMessages, newGroupMessage])); // 21. Append the new group message to the existing messages
            });

            // 22. Listen for when a user joins a group
            socketio.on('userJoinedGroup', ({ userId, groupId }) => {
                console.log(`User ${userId} joined group ${groupId}`); // 23. Log when a user joins the group
            });

            // 24. Listen for when a user leaves a group
            socketio.on('userLeftGroup', ({ userId, groupId }) => {
                console.log(`User ${userId} left group ${groupId}`); // 25. Log when a user leaves the group
            });

            // 26. Clean up when the component unmounts or userDetails changes
            return () => {
                socketio.close(); // 27. Close the socket connection
                dispatch(setSocket(null)); // 28. Remove the socket from Redux store
            };
        }
    }, [userDetails, dispatch]); // 29. Re-run this effect when userDetails or dispatch changes

    // 30. Function to join a group
    const joinGroup = (groupId) => {
        if (socketRef.current) { // 31. Check if the socket connection is active
            socketRef.current.emit('joinGroup', { groupId }); // 32. Emit 'joinGroup' event with the groupId to the server
        }
    };

    // 33. Function to leave a group
    const leaveGroup = (groupId) => {
        if (socketRef.current) { // 34. Check if the socket connection is active
            socketRef.current.emit('leaveGroup', { groupId }); // 35. Emit 'leaveGroup' event with the groupId to the server
        }
    };

    // 36. Function to send a message to a group
    const sendMessageToGroup = (groupId, message) => {
        if (socketRef.current) { // 37. Check if the socket connection is active
            socketRef.current.emit('sendMessageToGroup', { groupId, message }); // 38. Emit 'sendMessageToGroup' event with groupId and message to the server
        }
    };

    return null; // 39. Return null because this is a context provider for socket functionality
};

export default SocketContext;

