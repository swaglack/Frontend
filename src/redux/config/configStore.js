import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import logger from "redux-logger";
import thunk from "redux-thunk";
import slackReducer from "../slackSlice.js";

const middleware = [...getDefaultMiddleware(), thunk, logger];

const store = configureStore({
  reducer: {
    slack: slackReducer,
  },
  middleware,
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
