import { createSlice } from "@reduxjs/toolkit";

const userSubs = createSlice({
    name: "userSubs",
    initialState: {
        subs: null
    },
    reducers: {
        setUserSubs: (state, action) => {
            state.subs = action.payload;
        },
    }
});


export const { setUserSubs } = userSubs.actions;

export default userSubs.reducer;