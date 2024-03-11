import { createSlice } from "@reduxjs/toolkit";

const userAuthSlice = createSlice({
    name: "userAuth",
    initialState: {
        user: null,
        loaded: false,
    },
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = null;
        },
        loaded: (state) => {
            state.loaded = true;
        },
    },
});


export const { login, logout, loaded } = userAuthSlice.actions;

export default userAuthSlice.reducer;
