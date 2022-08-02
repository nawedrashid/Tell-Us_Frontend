import { configureStore } from "@reduxjs/toolkit";
import postSlice from "./PostSlice";
import userSlice from "./UserSlice";


const store = configureStore({
    reducer: {
        posts: postSlice.reducer, user: userSlice.reducer
    }
});

export default store;