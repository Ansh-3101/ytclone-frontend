import { createSlice } from "@reduxjs/toolkit";


const activeTag = createSlice({
    name: 'activeTag',
    initialState: {
        activeTag: {
            tag: "Home",
            id: null
        }
    },
    reducers: {
        setActiveTag: (state, action) => {
            state.activeTag = action.payload;
        }
    }
});


export const { setActiveTag } = activeTag.actions;

export default activeTag.reducer;