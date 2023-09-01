import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers";

export const store = configureStore({
  // we can update  with the help of  reducer
  reducer: {
    auth: authReducer,
  },
});
