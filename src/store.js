import { configureStore } from "@reduxjs/toolkit";
import { userReducer, modalReducer } from "./features";

const store = configureStore({
  reducer: {
    user: userReducer,
    modal: modalReducer,
  },
});

export default store;
