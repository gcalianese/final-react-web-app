import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "../Rocks/Account/reducer"
import postReducer from "./Posts/reducer"

const store = configureStore({
    reducer: {
        accountReducer,
        postReducer,
    },
});
export default store;