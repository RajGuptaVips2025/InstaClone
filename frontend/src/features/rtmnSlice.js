import { createSlice } from "@reduxjs/toolkit";

const rtmnSlice = createSlice({
    name: "realTimeNotification",
    initialState: {
        likeNotification: [],
    },
    reducers: {
        setLikeNotification: (state, action) => {
        
        }
    }
});

export const { setOnlineUsers, setMessages } = rtmnSlice.actions;
export default rtmnSlice.reducer;