// import { setOnlineUsers } from '@/features/chatSlice';
// import { setSocket } from '@/features/socketSlice';
// import React, { useEffect, useRef } from 'react';
// import { useDispatch, useSelector } from 'react-redux'; // Import useSelector to access Redux state
// import { io } from 'socket.io-client';

// const SocketContext = () => {
//     const userDetails = useSelector((state) => state?.user?.userDetail);
//     const socket = useSelector((state) => state?.socket?.socketio)
//     const dispatch = useDispatch();

//     const socketRef = useRef(null); // Use ref to hold socket connection

//     useEffect(() => {
//         if (userDetails) {
//             const socketio = io('http://localhost:3000', {
//                 query: {
//                     userId: userDetails._id,
//                 },
//                 transports: ['websocket']
//             });
//             dispatch(setSocket(socketio));

//             // Listen to all the events
//             socketio.on('getOnlineUsers', (onlineUsers) => {
//                 dispatch(setOnlineUsers(onlineUsers));
//             });

//             // Listen for new messages
//             socketio.on('newMessage', (newMessage) => {
//                 dispatch(setMessages((prevMessages) => [...prevMessages, newMessage]));
//             });

//             // Cleanup on unmount
//             return () => {
//                 socketio.close(); // Ensure to disconnect on component unmount
//                 dispatch(setSocket(null));
//             };
//         } else if (socket) {
//             // Cleanup on unmount
//             return () => {
//                 socket?.close(); // Ensure to disconnect on component unmount
//                 dispatch(setSocket(null));
//             };
//         }
//     }, [userDetails, dispatch]); // Add userDetails as a dependency

//     // return null; // No UI to render
// }

// export default SocketContext;


import { setOnlineUsers } from '@/features/chatSlice';
import { setSocket } from '@/features/socketSlice';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

const SocketContext = () => {
    const userDetails = useSelector((state) => state?.user?.userDetail);
    const dispatch = useDispatch();
    const socketRef = useRef(null);

    useEffect(() => {
        if (userDetails) {
            const socketio = io('http://localhost:3000', {
                query: {
                    userId: userDetails._id,
                },
                transports: ['websocket'],
            });

            socketRef.current = socketio; // Save socket to ref
            dispatch(setSocket(socketio));

            socketio.on('getOnlineUsers', (onlineUsers) => {
                dispatch(setOnlineUsers(onlineUsers));
            });

            socketio.on('newMessage', (newMessage) => {
                dispatch(setMessages((prevMessages) => [...prevMessages, newMessage])); // Ensure setMessages is defined properly
            });

            return () => {
                socketio.close();
                dispatch(setSocket(null));
            };
        }
    }, [userDetails, dispatch]);

    return null;
}

export default SocketContext;
