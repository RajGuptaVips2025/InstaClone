import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
    name: "chat",
    initialState: {
        onlineUsers: [],
        messages: [],
        chatMembers: [],
    },
    reducers: {
        setOnlineUsers: (state, action) => {
            state.onlineUsers = action.payload;
        },
        setMessages: (state, action) => {
            state.messages = action.payload;
        },
        setChatMembers: (state, action) => {
            state.chatMembers = action.payload;
        },
        
        setGroups: (state, action) => {
            state.chatMembers = action.payload;
        },
    }
});

export const { setOnlineUsers, setMessages, setChatMembers } = chatSlice.actions;
export default chatSlice.reducer;