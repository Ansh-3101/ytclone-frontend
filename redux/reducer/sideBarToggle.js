import { createSlice } from "@reduxjs/toolkit";


const sideBarToggle = createSlice({
    name: "sideBarToggle",
    initialState: {
        isOpen: true,
    },
    reducers: {
        toggleSidebar: (state) => {
            state.isOpen = !state.isOpen;
        },
    }

});

export const { toggleSidebar } = sideBarToggle.actions;

export default sideBarToggle.reducer;