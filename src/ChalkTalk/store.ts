import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "./Account/reducer"
import postReducer from "./Posts/reducer"
import gymsReducer from "./Search/reducer"

const store = configureStore({
    reducer: {
        accountReducer,
        postReducer,
        gymsReducer,
    },
});
export default store;