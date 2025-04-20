import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    currentUser: null,
};
const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        setCurrentUser: (state, action) => {
            console.log("REDUCER - OLD user: " + JSON.stringify(state.currentUser));
            console.log("REDUCER - Setting new user to " + JSON.stringify(action.payload));
            state.currentUser = action.payload;
            console.log("REDUCER - New user to " + JSON.stringify(state.currentUser));
        },
    },
});
export const { setCurrentUser } = accountSlice.actions;
export default accountSlice.reducer;