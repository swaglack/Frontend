import { configureStore } from "@reduxjs/toolkit";
import slack from "../slackSlice.js";
const store = configureStore({
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  // devTools: process.env.NODE_ENV !== "production",
  reducer: {
    slack,
  },
});

export default store;
