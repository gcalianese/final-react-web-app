import { configureStore } from "@reduxjs/toolkit";
import accountReducer from "../Rocks/Account/reducer"

const store = configureStore({
    reducer: {
        accountReducer,
    },
});
export default store;