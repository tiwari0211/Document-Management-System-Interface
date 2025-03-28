import { createSlice } from "@reduxjs/toolkit";
import { UserStatus } from "../../constants/routes/approved";

export interface User {
  status: UserStatus;
  number: string | number;
  modules: string[];
  full_name?: string;
}

const initialState: any = {
  user: null,
  all_users: [],
  all_modules: [
    { label: "Home", id: "home" },
    { label: "Files", id: "files" },
    { label: "Users", id: "users" },
  ],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    set_user: (state, action) => {
      state.user = action.payload;
    },
    set_all_users: (state, action) => {
      state.all_users = action.payload;
    },
    set_all_modules: (state, action) => {
      state.all_modules = action.payload;
    },
  },
  extraReducers() {},
});

export const { set_user, set_all_users, set_all_modules } = userSlice.actions;
export default userSlice.reducer;
