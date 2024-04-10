import {configureStore} from "@reduxjs/toolkit";
import motorbikeReducer from "@/redux/reducers";

export const store = configureStore({
    reducer: {
        listMotorbike: motorbikeReducer
    },
    devTools: process.env.NODE_ENV !== "production"
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
