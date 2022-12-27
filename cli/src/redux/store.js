import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { filesSlice } from "../redux/files/filesSlice";
import { errorSlice } from "../redux/files/errorSlice";

const rootReducer = combineReducers({
  files: filesSlice.reducer,
  error: errorSlice.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

/**
 *
 * Function used for unit testing
 */
export const setupStore = (preloadedState) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};
