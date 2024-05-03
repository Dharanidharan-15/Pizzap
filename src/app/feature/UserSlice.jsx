import { createSlice } from "@reduxjs/toolkit";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const userSlice = createSlice({
  name: "user",
  initialState: {},
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      cookies.set("HeyDDDd", state.name, 100000);
    },
    clearUser: (state, action) => {
      state.user = null;
      cookies.remove("HeyDDDd");
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
