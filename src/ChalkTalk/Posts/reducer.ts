import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    posts: [],
};
const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        setPostsR: (state, action) => {
            state.posts = action.payload;
        },
    },
});
export const { setPostsR } = postSlice.actions;
export default postSlice.reducer;