import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: "light",
    user: null,
    token: null,
    posts: []
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode == "light" ? "dark" : "light";
        },
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) => {
            state.user = null
            state.token = null
        },
        setFollowing: (state, action) => {
            if(state.user){
                state.user.following = action.payload.friends
            }else{
                console.error("user does not follow anyone")
            }
        },
        setPosts: (state, action) => {
            state.posts = action.payload.posts
        },
        setPost: (state, action) => {
            const updatedPosts = state.posts.map((post) =>{
                if(post.id === action.payload.post_id) return action.payload.post;
            });
            state.posts = updatedPosts
        }
    }
})

export const {setMode, setLogin, setLogout, setFollowing, setPosts, setPost } = authSlice.actions
export default authSlice.reducer