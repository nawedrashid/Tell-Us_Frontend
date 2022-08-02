import { createSlice } from "@reduxjs/toolkit";


const postSlice = createSlice({
    name: "posts",
    initialState: {post: []},
    reducers: {
        getPost( state, action ){
            const newState = {...state}
            newState.post = action.payload;
            return newState;
        },
        addPost( state, action ){
            const newState = { ...state }
            newState.post.concat({
                postText: action.payload,
                like: false,
                dislike: false
            });
            return newState;
        },
        likePost( state, action ){
            const newPostState = state.post.map((post)=>{
                if(post._id === action.payload.postId);
                    post.like = post.like.concat(action.payload.userId);
                return post; 
            });
        },
        dislikePost( state, action ){
            const newPostState = state.post.map((post)=>{
                if(post._id === action.payload.postId);
                    post.dislike = post.dislike.concat(action.payload.userId);
                return post; 
            });
        },
        deletePost( state, action ){
            state.post = state.post.filter((data)=> data._id === action.payload);
            return state;
        },
        editPost( state, action ){
            //  const newPostState = state.post.map((data,i)=>{
            //     if(i === action.payload){
            //         postText = 
            //     }
            //  })
        },
        Comment(state,action){
            const newPostState = state.post.map((post) => {
                if(post._id === action.payload._id)
                    post.comments = action.payload.comments;
                return post;
            })
        }
    }
})

export const postAction = postSlice.actions;

export default postSlice;