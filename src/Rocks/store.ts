import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "../Rocks/Account/reducer"
import postReducer from "../Rocks/Home/Post/reducer"

const store = configureStore({
    reducer: {
        accountReducer,
        postReducer,
    },
});
export default store;