// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducer/rootReducer";

export const store = configureStore({
  reducer: rootReducer,
});

export default store;
