import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "./feature/UserSlice";

const rootReducer = combineReducers({ user: userSlice });
const store = configureStore({
  reducer: rootReducer,
});

export default store;
