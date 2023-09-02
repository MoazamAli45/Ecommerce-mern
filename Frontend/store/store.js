import { configureStore } from "@reduxjs/toolkit";
//   Initial state here as reducers are on different modules due to async

import authReducer from "./authReducer";

export const store = configureStore({
  // we can update  with the help of  reducer
  reducer: {
    auth: authReducer,
  },
});
