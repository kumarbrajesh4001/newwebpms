import { configureStore } from "@reduxjs/toolkit";
import sessionReducer from "../reducer";

const store = configureStore({
  reducer: {
    userInfoReducer: sessionReducer,
  },
});

export default store;
