import { configureStore } from "@reduxjs/toolkit";
import { filesSlice } from "../redux/files/filesSlice";
import { errorSlice } from "../redux/files/errorSlice";

export const store = configureStore({
  reducer: { files: filesSlice.reducer, error: errorSlice.reducer },
});
