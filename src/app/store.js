import { configureStore } from "@reduxjs/toolkit";
import userDetail from "../features/userDetail";


export const store = configureStore({
    reducer: {
        app: userDetail,
    },
})