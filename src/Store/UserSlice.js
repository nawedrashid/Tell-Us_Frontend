import { createSlice } from "@reduxjs/toolkit";


export const userSlice = createSlice({
    name:"User",
    initialState: { user:{}, userLoggedIn:false},
    reducers:{
        loginUser(state,action){
            let newState = {user:action.payload, userLoggedIn:true}
            return newState
        },
        logoutUser(state){
            state.user = {}
            state.userLoggedIn = false
        },
        getUserFollowings(state,action){
            let newState = {...state, user:{...state.user, followings:action.payload}}
            return newState
        },
        getUserFollowers(state,action){
            let newState = {...state, user:{...state.user, followers:action.payload}}
            return newState
        }
    }
})

export const userAction = userSlice.actions;

export default userSlice;