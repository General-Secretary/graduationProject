
import { configureStore } from "@reduxjs/toolkit";
import userTypeReducer from "./userTypeSlice";
import userIdReducer from "./userIdSlice";
import userTokenReducer from "./userTokenSlice";

export const store = configureStore({
    reducer: {
        userType: userTypeReducer, 
        userId: userIdReducer, 
        userToken:userTokenReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});
