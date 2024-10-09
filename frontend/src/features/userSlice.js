import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userDetail: null,
    usersProfiles: [], // Initial state should be an array, not null
    suggestedUser: [],
    selectedUser: null, // user that is selected will chatting.
    following: [],
    followers: [],
  },
  reducers: {
    setUserDetail: (state, action) => {
      state.userDetail = action.payload;
    },
    setUsersProfiles: (state, action) => {
      state.usersProfiles = action.payload; // Update state with the list of users
    },
    setSuggestedUser: (state, action) => {
      state.suggestedUser = action.payload;
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    setFollowing: (state, action) => {
      state.following = action.payload;
    },
    setFollowers: (state, action) => {
      state.followers = action.payload;
    }
  },
});

export const { setUserDetail, setUsersProfiles, setSuggestedUser, setSelectedUser, setFollowing, setFollowers } = userSlice.actions;
export default userSlice.reducer;


