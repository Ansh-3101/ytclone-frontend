import { createSlice } from "@reduxjs/toolkit";


const userStats = createSlice({
    name: "userStats",
    initialState: {
        stats: null
    },
    reducers: {
        setUserStats: (state, action) => {
            state.stats = action.payload;
        },
    }
});

export const { setUserStats } = userStats.actions;

export default userStats.reducer;
