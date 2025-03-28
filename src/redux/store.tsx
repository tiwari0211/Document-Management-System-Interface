import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import userReducer from "./user/userSlice";
import constantReducer from "./constants/constantSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer, 
    user: userReducer,
    constants:constantReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
