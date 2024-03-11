import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userAuth from './reducer/userAuth';
import sideBarToggle from './reducer/sideBarToggle';
import userStats from './reducer/userStats';
import userSubs from './reducer/userSubs';
import activeTag from './reducer/activeTag';

const store = configureStore({
    reducer: combineReducers({
        userAuth,
        sideBarToggle,
        userStats,
        userSubs,
        activeTag
    }),
});

export default store;
