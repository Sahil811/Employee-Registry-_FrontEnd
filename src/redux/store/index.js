import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import userReducer from "../slices/user";
import employeeReducer from "../slices/employeeList";

export default configureStore({
  reducer: {
    userData: userReducer,
    employeeData:  employeeReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      process.env.NODE_ENV === "production" ? [] : createLogger()
    ),
  initialState: {},
});